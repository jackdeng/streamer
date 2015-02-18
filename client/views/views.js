Views = {};

var displayStream = function(postsToShow) {
	Tracker.autorun(function() {
		var data = postsToShow.map(function(item) {
			var metadata = item.metadata || [];
			var comments = item.comments || [];
			return {
				"title": item.title,
				"url": item.url,
				"user": item.user,
				"posters": item.posters,
				"comment": comments.pop(),
				"description": metadata.description || "",
				"images": metadata.images || [],
				"media": metadata.media || {},
				"favicon_url": metadata.favicon_url || "",
				"provider_url": metadata.provider_url || ""
			}
		});

		if (Meteor.user()) {
			var username = Meteor.user().profile.firstName;
			React.renderComponent(new StreamAtom({ "data": data, "route": Router.current().route.getName(), "username": username}), document.body);
		}
	});
}

Views.Stream = function() {
	//TODO: investigate excluding autorun, seems to be reactive without it.
	displayStream(Posts.find({}, {
		//HACK: sort on client so that adding new content goes to the top. Otherwise, 15 most recent are returned but
		//newly added items go to the bottom.
		//HACK: investigate how we can sort only once, not both on client and server.
		"sort": {
			"date": -1
		}
	}));
}

Views.Login = function() {
	Tracker.autorun(function() {
		React.renderComponent(new LoginAtom(), document.body);
	});
}

Views.Bookmarks = function() {
  if (Meteor.user()) {
    urlsAndDates = Meteor.user().bookmarks;
    //TODO: why does urlsAndDates sometimes return undefined?
    if (urlsAndDates) {
		// get unique bookmarks only. Currently, we store one entry in this array
	    // for every time a user bookmarks something.
	    // TODO: find better way to maintain order of returned bookmarks. Right now we rely on the fact the most recent is pushed to the end of bookmarks.
	    // TODO: ensure uniqueness in a more elegant way
	    // The most recent is pushed to the end, so we reverse the bookmarks
	    var urlsByMostRecent = urlsAndDates.map(function(item) {
	    	return item["url"];
	    }).reverse();
	    var urlsOnly = _.uniq(urlsByMostRecent);
	    // this will make a lot of database calls if a user has stored a lot of bookmarks.
	    // TODO: Mapping from url to Posts sometimes does not return a valid post.
	    // TODO: sanitize data so that we can use map instead of forEach to check for validity
	    var userPosts = [];
	    urlsOnly.forEach(function(url) {
			var post = Posts.findOne({url: url});
			if (post) {
				userPosts.push(post);
			}
		});

	    displayStream(userPosts);
    }
  }
}