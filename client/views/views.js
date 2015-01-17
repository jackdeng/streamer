Views = {};

Views.Stream = function() {
	//TODO: investigate excluding autorun, seems to be reactive without it.
	Tracker.autorun(function() {
		var data = Posts.find().map(function(item) {
			var metadata = item.metadata || [];
			return {
				"title": item.title,
				"url": item.url,
				"user": item.user,
				"posters": item.posters,
				"description": metadata.description || "",
				"images": metadata.images || [],
				"media": metadata.media || {},
				"favicon_url": metadata.favicon_url || "",
				"provider_url": metadata.provider_url || ""
			}
		});

		React.renderComponent(new StreamAtom({ "data": data, "route": window.location.href}), document.body);
	});
}

// The Login view
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
	Tracker.autorun(function() {
		//TODO: implement
	});
}