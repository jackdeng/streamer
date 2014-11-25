Views = {};

var constructView = function(constructor) {
	Tracker.autorun(constructor);
}

// Stream is the view at path/
Views.Stream = function() {
	var getStreamData = function() {
		return Posts.find({}, {
			"limit": 25,
			"sort": {
				"date": -1
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