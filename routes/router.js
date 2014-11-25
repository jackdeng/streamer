Router.route('/', function () {
	if (Meteor.user()) {
		Routes.main();
	}
	else {
		Routes.login();
	}
});
