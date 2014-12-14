// Client collection subscriptions
Meteor.subscribe("posts");
Meteor.subscribe("chat");
Meteor.subscribe("userData");

Meteor.startup(function() {
	Tracker.autorun(function() {
		console.log("/*** Meteor startup ***/");

		// save cookies
		if (Meteor.userId()) {
			console.log("UserId found, saving to Cookie");
			Util.setCookie("meteor_userid", Meteor.userId(), 1);
		}
	});
});
