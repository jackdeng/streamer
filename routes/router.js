Router.route('/', function () {
	Routes.main();
});

Router.route('/login', function () {
	Routes.login();
});

Router.route('/chat', function() {
	Routes.chat();
})