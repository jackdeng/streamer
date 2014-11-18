Views = {};

var constructView = function(constructor) {
	Tracker.autorun(constructor);
}

// Stream is the view at path/
Views.Stream = function() {
	constructView(function() {
		var data = Posts.find();
		React.renderComponent(new StreamAtom({ "data": data}), document.body);
		Meteor.call("getRedditHot");
	});
}


// The Login view
Views.Login = function() {
	constructView(function() {
		React.renderComponent(new LoginAtom(), document.body);
	});
}