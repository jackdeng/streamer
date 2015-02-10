Router.route('/', function () {
	// You can redirect from one route to another from inside a route function
	// by using the redirect method inside your route function.

	Tracker.autorun(function() {
		if (Meteor.loggingIn() || Meteor.user()) {
			Router.go('/far');
		} else {
			Routes.login();
		}
	})
});

Router.route('/stream', function() {
	Routes.main();
})

Router.route('/login', function () {
	Routes.login();
});

Router.route('/far', function() {
	Tracker.autorun(function() {
		if (Meteor.loggingIn() || Meteor.user()) {
			Routes.main();
		} else {
			Routes.login();
		}
	})
})

Router.route('/here', function() {
	Tracker.autorun(function() {
		if (Meteor.loggingIn() || Meteor.user()) {
			Routes.bookmarks();
		} else {
			Routes.login();
		}
	});
});
