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

Router.route('/read', {"where": "server"})
	.post(function() {
		console.log('***PLUGIN hit POST route!');
	})
	.get(function() {
		console.log("plugin GET route!");
	})