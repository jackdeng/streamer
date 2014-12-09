/** @jsx React.DOM */

/** Chat Box Structure **/
/** 
- chatBox
  - chatList
    - chatEntry
      - chatAuthor
      - chatMessage
  - chatForm
    - chatAuthor
    - chatInput
**/

ChatAtom = React.createClass({
  mixins: [ReactMeteor.Mixin],
  getInitialState: function() {
    return {
      data: [] 
    };
  },
  getMeteorState: function() {
    return this.state;
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.chatRoom) {
      this.setState({
        data: nextProps.chatRoom.history
      });
    }
  },
  updateChat: function(comment) {
    // TODO: figure out how to render when the collection is updated, 
    // as not to update state ourselves.
    var query = {
      "url": this.props.url
    }

    var comments = this.state.data;
    var newComments = comments.concat([comment]);

    // optimistically display the chat message in client
    //this.setState({"data": newComments});

    // update the chat collection.
    var options = {
      "query": query,
      "comments" : newComments
    }

    Meteor.call("updateChat", options);
  },
  render: function() {
    // TODO! Use this.props.chatRoom.history or this.state.data?
    return  (
      <div className="chatBox">
        <ChatList data={this.state.data} />
        <ChatForm onCommentSubmit={this.updateChat} />
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
    var chatEntries = this.props.data.map(function(entry) {
      return (
        <ChatEntry user={entry.user} message={entry.message}></ChatEntry>
      );
    });

    return chatEntries;
  },
  render: function() {
    return (
      <div className="chatList">
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
        <ChatUser userName={this.props.user} userColor={Please.make_color({"saturation": 0.58})}></ChatUser>
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
    if (this.props.userName === "Guest") {
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
  handleSubmit: function(event) {
    if (event.keyCode === 13) {
      // cancel default event actions
      event.preventDefault();
      var author = "Guest";
      var text = this.refs.text.getDOMNode().value.trim();
      if (!text || !author) {
        return;
      }
      // TODO: send request to server.
      var comment = {
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
