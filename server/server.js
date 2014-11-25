/** Start of server code **/

/** Routes **/
Router.route('/visit', {"where": "server"}).post(function() {
  console.log('***!!! PLUGIN hit POST route!');
  console.log("data header is : " + JSON.stringify(this.request.headers));
  console.log("data body is : " + JSON.stringify(this.request.body));
  var data = this.request.body;

  // update Posts
  var query = {"url": data.url};
  Posts.update(query, data, {"upsert": true});

  // update Metadata collection
  updateMetadata(data);
})

var updateMetadata = function(data) {
  var extractBase = 'http://api.embed.ly/1/extract';
  var embedlyKey = "73542b8e014d4fcd80f5d28eae5fb98f";
  var escapedUrl = encodeURIComponent(data.url);

  var params = {
    "key": embedlyKey,
    "url": escapedUrl
  }

  var testURL = extractBase + "?" + "key=" + embedlyKey + "&" + "url=" + escapedUrl;
  console.log("testURL : " + testURL);

  //TODO: sanitize URLs against bit.ly, addtional params, special params, etc
  //TODO: check metadata for entry before fetch and update from embedly.
  HTTP.get(testURL, function(err, response) {
    if (err) {
      console.log("GET from embed.ly failed");
      console.log(JSON.stringify(err));
      return;
    }

    var results = response.data;
    console.log("reponse from embedly looks like: " + JSON.stringify(results));

    var query = {"original_url": data.url};
    Metadata.update(query, results, {"upsert": true});
  });
}

/** Methods **/
/** In app client----> server methods **/
Meteor.methods({
  "getRedditHot": function() {
    console.log("starting to get Reddit Hot section");

    redditOptions = {
      "limit": 30 
    }

    HTTP.get("http://reddit.com/hot.json", redditOptions, function(err, response) {
      if (err) {
        console.log("error in fetchign from hot hot reddit");
        return;
      }

      var results = JSON.parse(response.content).data.children;
      console.log("results have returned from reddit, inserting into POST");
      populatePostsWithReddit(results);
    });
  }
});

var populatePostsWithReddit = function(results) {
  console.log("beginning to populate Posts collection with top Reddit posts");
  for (var index = 0; index < results.length; index++) {
    var data = results[index].data;
    var query = {"url": data.url};
    Posts.update(query, data, {"upsert": true});
  }
  console.log("populating has finished. Posts count: " + Posts.find().count());
}