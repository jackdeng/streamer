Views = {};

var constructView = function(constructor) {
	Tracker.autorun(constructor);
}

// Stream is the view at path/
Views.Stream = function() {
	var getStreamData = function() {
		Meteor.call("getRedditHot");
		// find takes two params: selector, options
		return Posts.find({}, {
			"limit": 25,
			"sort": {
				"created_utc": -1
			}	
		});
	};
	constructView(function() {
		var data = getStreamData();
		React.renderComponent(new StreamAtom({ "data": data}), document.body);
	});
}

// The Login view
Views.Login = function() {
	constructView(function() {
		React.renderComponent(new LoginAtom(), document.body);
	});
}