Router.configure({
	notFoundTemplate: function() {
		console.log("not found");
	}
});

Router.route('/', function () {
	if (Meteor.user()) {
		Routes.main();
	}
	else {
		Routes.login();
	}
});