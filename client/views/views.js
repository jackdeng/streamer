Views = {};

var displayStream = function(postsToShow) {
	Tracker.autorun(function() {
		var data = postsToShow.map(function(item) {
			var metadata = item.metadata || [];
			return {
				"title": item.title,
				"url": item.url,
				"user": item.user,
				"description": metadata.description || "",
				"images": metadata.images || [],
				"media": metadata.media || {},
				"favicon_url": metadata.favicon_url || "",
				"provider_url": metadata.provider_url || ""
			}
		});

		React.renderComponent(new StreamAtom({ "data": data}), document.body);
	});
}

Views.Stream = function() {
	//TODO: investigate excluding autorun, seems to be reactive without it.
	displayStream(Posts.find({}, {
		"limit": 15,
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

Views.Chat = function() {
	Tracker.autorun(function() {
		React.renderComponent(new ChatAtom(), document.body);
	});
}

Views.Bookmarks = function() {
	if (Meteor.user()) {
	  urlsAndDates = Meteor.user().bookmarks;
	  // get unique bookmarks only. Currently, we store one entry in this array
	  // for every time a user bookmarks something.
	  // TODO: ensure uniqueness in a more elegant way
	  var urlsOnly = _.uniq(urlsAndDates.map(function(item) {
	    return item["url"];
	  }));
	  // this will make a lot of database calls if a user has stored a lot of bookmarks.
	  // TODO: find better way to maintain order of returned bookmarks
	  posts = urlsOnly.map(function(url) {
	    return Posts.findOne({url: url});
	  });
		displayStream(posts);
	}
}