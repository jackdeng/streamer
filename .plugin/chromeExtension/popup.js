var serverEndpoint ="http://pure-bayou-5343.herokuapp.com/";

function bootstrap() {
  console.log("in bootstrap...");

  // include // to distinguish
  var url;
  // cache this context.
  var self = this;  
  var tabQueryOptions = {
    'active' : true, 
    'currentWindow': true
  };

  // get URL of current tab.
  chrome.tabs.query(
    tabQueryOptions,
    function(tabs) {
      console.log("the tabs are: " + JSON.stringify(tabs));
      currentTab = tabs[0];
      self.url = currentTab.url;
      self.title = currentTab.title;
      self.page = currentTab;
      postURL();
    }
  );
}

function postURL() {
  //create xhr request endpoint
  console.log("adding url to xhr: " + this.url);
  var endpointURL = serverEndpoint + "read";

  var xhr = new XMLHttpRequest(); 
  xhr.open("POST", endpointURL, true);
  xhr.setRequestHeader("Content-type", "application/json");
  //JSON data needs to be stringified to a JSON representation.

  var siteURL = this.url;
  var siteTitle = this.title;
  var sitePage = this.page;

  var cookieDetails = {
    url: serverEndpoint,
    name: "user"
  }

  chrome.cookies.get(cookieDetails, function(cookie) {
    // TODO: make sure user is signed in!
    var user = cookie.value || "guest";
    console.log("the user is: " + user);

    var data = {
      page: sitePage,
      title: siteTitle,
      url: siteURL, 
      user: user,
      time: moment().toDate()
    };

    console.log("the popup request is: " + JSON.stringify(data));
    xhr.send(JSON.stringify(data)); 
  });
}

var appendLoader = function() {
    var loader = document.getElementById("loader");
    var header = document.getElementsByTagName('h1')[0];
    var loadingImage = new Image();
    var dogHeader = "fetching url!"; 
    var catHeader = "catpurring url...";

    var randSeed = Math.random();
    if (randSeed < 0.2) {
      loadingImage.src = "corgi_loop.gif";
      header.innerHTML = dogHeader;
    } else if (randSeed < 0.4) {
      loadingImage.src = "corgi_treadmill.gif";
      header.innerHTML = dogHeader;
    } else if (randSeed <0.6) {
      loadingImage.src = "corgi_flop.gif";
      header.innerHTML = dogHeader;
    } else if (randSeed <0.8) {
      loadingImage.src = "cat_snowdive.gif";
      header.innerHTML = catHeader;
    }
    else {
      loadingImage.src = "cat_wiggle.gif";
      header.innerHTML = catHeader;
    }
    loader.appendChild(loadingImage); 
}

document.addEventListener('DOMContentLoaded', function () {
  appendLoader();
  bootstrap();  
});
