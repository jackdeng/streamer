Views = {};

// Stream is the view at path/
Views.Stream = function() {
	Tracker.autorun(function() {
		var data = Posts.find();
		React.renderComponent(new StreamAtom({ "data": data}), document.body);
		Meteor.call("getRedditHot");
	});
}