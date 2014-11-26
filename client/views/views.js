Views = {};

Views.Stream = function() {
	//TODO: investigate excluding autorun, seems to be reactive without it.
	Tracker.autorun(function() {
		// only return 25 most recent metadata
		var data = Posts.find({}, {
			"limit": 25,
			"sort": {
				"date": -1
			}
		}).map(function(item) {
			var metadata = item.metadata || [];
			return {
				"title": item.title, 
				"url": item.url,
				"user": item.user,
				"description": metadata.description || "",
				"images": metadata.images || []
			}
		});

		React.renderComponent(new StreamAtom({ "data": data}), document.body);
	});
}

// The Login view
Views.Login = function() {
	Tracker.autorun(function() {
		React.renderComponent(new LoginAtom(), document.body);
	});
}