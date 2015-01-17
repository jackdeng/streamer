/* setup */
var POST_LIMIT = 15;
Session.set("postLimit", POST_LIMIT);

/* Subscriptions */
Meteor.subscribe("posts", {"limit": Session.get("postLimit")});
Meteor.subscribe("chat");
Meteor.subscribe("userData");

/* save cookies */
Tracker.autorun(function() {
	if (Meteor.userId()) {
		console.log("UserId found, saving to Cookie");
		Util.setCookie("meteor_userid", Meteor.userId(), 1);
	}
});
