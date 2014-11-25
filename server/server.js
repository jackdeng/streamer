/** Start of server code **/

/** Routes **/
Router.route('/visit', {"where": "server"}).post(function() {
  console.log('***!!! PLUGIN hit POST route!');
  console.log("data header is : " + JSON.stringify(this.request.headers));
  console.log("data body is : " + JSON.stringify(this.request.body));
  var data = this.request.body;

  var query = {"url": data.url};
  Posts.update(query, data, {"upsert": true});
})

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