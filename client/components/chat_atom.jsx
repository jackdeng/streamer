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
    // getInitialState executes exactly ONCE during the lifetime of
    // the component and setsup the initial state of the component.
    // TODO: get chat history here?
    return {data: []};
  },
  getMeteorState: function() {
    return this.state;
  },
  loadCommentsFromServer: function() {
    var history = [
      {"user": "Jack Deng", "message": "this is the first comment"},
      {"user": "Reid Hoffman", "message": "this is *the* test"}];

    this.setState({"data": history});
  },
  displayComment: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({"data": newComments});
  },
  handleCommentSubmit: function(comment) {
    var chatEntry = {
      url: this.props.url,
      user: comment.user,
      message: comment.message
    }

    this.displayComment(comment);
  },
  // componentDidMount is called automatically when the view is rendered
  componentDidMount: function() {
    this.loadCommentsFromServer();
  },
  render : function() {
    return  (
      <div className="chatBox">
        <ChatList data={this.state.data} />
        <ChatForm onCommentSubmit={this.handleCommentSubmit} />
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
