Router.configure({
	notFoundTemplate: function() {
		console.log("not found");
	}
});

Router.route('/', function () {
	Routes.main();
});