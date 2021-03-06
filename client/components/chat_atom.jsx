/** @jsx React.DOM */

ChatAtom = React.createClass({
  mixins: [ReactMeteor.Mixin],
  getMeteorState: function() {
    return this.state;
  },
  updateChat: function(comment) {
    var query = {
      "url": this.props.url
    }
    var comments = this.props.chatRoom.history;
    var newComments = comments.concat([comment]);

    // update the chat collection.
    var options = {
      "query": query,
      "comments" : newComments
    }

    Meteor.call("updateChat", options);
  },
  showChat: function() {
    this.setState({"hasClickedMatch": true});
  },
  likePost: function() {
    // call server to save post
    options = {
      userId: Meteor.userId(),
      url: this.props.url
    }

    Meteor.call("addUserToPost", options);
  },
  getLikeClasses: function() {
    var classes = "like";
    if (this.props.posters.indexOf(Meteor.userId()) != -1) {
      classes += " selected";
    }
    return classes;
  },
  chattable: function() {
    var hasChatContent = this.props.chatRoom.history.length > 0;
    var isPoster = this.props.posters.indexOf(Meteor.userId()) != -1;
    return isPoster && hasChatContent;
  },
  matchable: function() {
    var numPosters = this.props.posters.length;
    return numPosters > 1 && this.props.posters.indexOf(Meteor.userId()) != -1
  },
  createCard: function() {
    if (this.props.chatRoom) {
      if (this.state.hasClickedMatch || this.chattable()) {
        return (
          <div className="chatBox">
            <ChatList data={this.props.chatRoom.history} posters={this.props.posters} />
            <ChatForm shouldFocus={this.state.hasClickedMatch} onCommentSubmit={this.updateChat} />
          </div>
        );
      } else if (this.matchable()) {
          var matchString = "\u2661" + " (" + this.props.posters.length + ")";
          return (
            <div className="match" onClick={this.showChat}>{matchString}</div>
          );
      } else {
          var heart = "\u2661"
          return (
            <div className={this.getLikeClasses()} onClick={this.likePost}>{heart}</div>
          );
      }
    }
  },
  render: function() {
    // TODO! Use this.props.chatRoom.history or this.state.data?
    // TODO correct the error when this.props.chatRoom is undefined.
    return  (
      <div className="chatContent">
        <div className="conversations">
          <CommentAtom data={this.props.comment} />
        </div>
        {this.createCard()}
      </div>
    );
  }
});

var CommentAtom = React.createClass({
  mixins: [ReactMeteor.Mixin],
  getMeteorState: function() {
    return this.state;
  },
  render: function() {
    return (
      <div className="comment">
        {this.props.data.comment}
      </div>
    );
  }
});

var ChatList = React.createClass({
  mixins: [ReactMeteor.Mixin],
  getMeteorState: function() {
    return this.state;
  },
  getChatEntries: function() {
    //TODO: refactor hack to use user_color and user_name from user profile
    //refactor chat to have messages by _id.
    var that = this;
    var chatEntries = this.props.data.map(function(entry) {
      var userId = entry.userId;
      var userColor = "2b2b2b"
      if (that.state.profileMap) {
        userColor = that.state.profileMap[userId].color;
      }

      return (
        <ChatEntry user={entry.user} message={entry.message} color={userColor}></ChatEntry>
      );
    });

    return chatEntries;
  },
  setProfileMap: function() {
    var that = this;
    Meteor.call("getProfileMap", this.props.posters, function(err, result) {
      that.setState({"profileMap": result});
    });
  },
  componentDidMount: function() {
    this.setScrollHeight();
    this.setProfileMap();
  },
  componentDidUpdate: function() {
    // TODO: is there a better way to permanently set the scrol to the bottom than to call in both lifecyle methods?
    // didMount for first render, didUpdate for subsequent render
    this.setScrollHeight();
  },
  setScrollHeight: function() {
    var dom = this.refs.chatList.getDOMNode()
    dom.scrollTop = dom.scrollHeight;
  },
  render: function() {
    return (
      <div ref="chatList" className="chatList">
        {this.getChatEntries()}
      </div>
    );
  }
});

var ChatEntry = React.createClass({
  mixins: [ReactMeteor.Mixin],
  getMeteorState: function() {
    return this.state;
  },
  render : function() {
    return (
      <div className="chatEntry">
        <ChatUser userName={this.props.user} userColor={this.props.color}></ChatUser>
        <ChatMessage message={this.props.message}></ChatMessage>
        <div className="placeholder"></div>
      </div>
    );
  }
});

var ChatUser = React.createClass({
  mixins: [ReactMeteor.Mixin],
  getMeteorState: function() {
    return this.state;
  },
  createShortUsername: function() {
    // shortName is first two letter of first name.
    var shortName = this.props.userName.split(" ")[0].slice(0, 2);
    return shortName;
  },
  createUserClassname: function() {
    var className = "chatUser";
    var currentUsername = Meteor.user().profile.fullname;
    if (this.props.userName === currentUsername) {
      className = className.concat(" ", "self");
    }
    return className;
  },
  createStyles: function() {
    var styles = {}
    styles["background"] = this.props.userColor;
    return styles;
  },
  render: function() {
    return (
      <div  className={this.createUserClassname()} style={this.createStyles()}>{this.createShortUsername()}</div>
    );
  }
});

var ChatMessage = React.createClass({
  mixins: [ReactMeteor.Mixin],
  getMeteorState: function() {
    return this.state;
  },
  render: function() {
    return (
      <div className="chatMessage">{this.props.message}</div>
    );
  }
});

var ChatForm = React.createClass({
  mixins: [ReactMeteor.Mixin],
  getMeteorState: function() {
    return this.state;
  },
  componentDidMount: function() {
    if (this.props.shouldFocus) {
      this.refs.text.getDOMNode().focus();
    }
  },
  handleSubmit: function(event) {
    if (event.keyCode === 13) {
      // cancel default event actions
      event.preventDefault();

      var user = Meteor.user();
      var userId = Meteor.userId();
      var userProfile = user.profile;
      var author = userProfile.fullname;

      var text = this.refs.text.getDOMNode().value.trim();
      if (!text || !author) {
        return;
      }
      // TODO: send request to server.
      var comment = {
        "userId": userId,
        "user" : author,
        "message" : text
      }
      // hands a callback to the parent
      this.props.onCommentSubmit(comment);
      this.refs.text.getDOMNode().value = "";
      return;
    }
  },
  render : function() {
    return (
      <div className="chatForm" onKeyDown={this.handleSubmit}>
        <input className="chatInput" type="text" placeholder="say anything..." ref="text"/>
      </div>
    );
  }
});
