/** Start of server code **/

/** Publication **/
Meteor.publish("posts", function(options) {
  return Posts.find({}, {
      "limit": options.limit,
      "sort": {
        "date": -1
      }
  })
});

Meteor.publish("chat", function() {
  return Chat.find();
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
      {fields: {bookmarks: 1}});
  } else {
    this.ready();
  }
});

/** Accounts Configuration **/
Accounts.onCreateUser(function(options, user) {
  user.bookmarks = [];
  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;
  return user;
});

/** Routes **/
Router.route('/visit', {"where": "server"}).post(function() {
  var data = this.request.body;

  // update Posts
  var query = {"url": data.url};
  var modifier = {
    "$set": {
      "url": data.url,
      "date": data.date,
      "title": data.title
    },
    "$addToSet": {
      "posters": data.userid
    }
  }

  Posts.update(query, modifier, {"upsert": true}, function(err, doc) {
    if (err) {
      console.log("Post update ERROR");
      return;
    }

    updateMetadata(data);
  });

  // update Users
  Meteor.users.update({ _id: data.userid }, {
    "$push": {"bookmarks": {"date": data.date, "url": data.url}}
  });

  // new chat for url.
  var chatRoom = Chat.findOne(query);
  var newChat = {
    "url": data.url,
    "history": []
  }

  if (!chatRoom) {
    console.log("no chatroom found: inserting");
    Chat.insert(newChat, function(err, id) {
      if (err) {
        console.log("chat insert gone wrong");
        return;
      }
    });
  }
});

var updateMetadata = function(data) {
  var extractBase = 'http://api.embed.ly/1/extract';
  var embedlyKey = "73542b8e014d4fcd80f5d28eae5fb98f";
  var escapedUrl = encodeURIComponent(data.url);
  var quickEmbedlyURL = extractBase + "?" + "key=" + embedlyKey + "&" + "url=" + escapedUrl;

  //TODO: sanitize URLs against bit.ly, addtional params, special params, etc
  //TODO: check metadata for entry before fetch and update from embedly.
  HTTP.get(quickEmbedlyURL, function(err, response) {
    if (err) {
      console.log("GET from embed.ly failed");
      console.log(JSON.stringify(err));
      return;
    }

    var metadata = response.data || {};
    var query = {"url": data.url}
    Posts.update(query, {$set: {"metadata": metadata}});
  });
}

/** Methods **/
/** In app client----> server methods **/
Meteor.methods({
  "updateChat": function(options) {
    Chat.update(options.query, {
      "$set": {
        "history": options.comments
      }
    });
  },
  "addUserToPost": function(options) {
    var url = options.url;
    var userId = options.userId;
    // update Posts
    var query = {"url": url};
    var modifier = {
      "$addToSet": {
        "posters": userId
      }
    }

    Posts.update(query, modifier, {"upsert": true}, function(err, doc) {
      if (err) {
        console.log("Post update ERROR");
        return;
      }
    });
  }
});
