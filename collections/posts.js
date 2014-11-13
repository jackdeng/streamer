// Application collections
Posts = new Mongo.Collection('posts');

// generate fake content for the Posts.
if (Meteor.isServer && false) {
	if (Posts.find().count() === 0) {
	  // initializing posts
	  console.log("initializing Posts collection");
	  Posts.insert({
	    title: 'the matrix has you',
	    url: 'localhost:3000/'
	  });

	  Posts.insert({
	    title: 'Meteor',
	    url: 'http://meteor.com'
	  });

	  Posts.insert({
	    title: 'The Meteor Book',
	    url: 'http://themeteorbook.com'
	  });
	}
}
