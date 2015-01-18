/** @jsx React.DOM */
BannerAtom = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return this.state;
	},
	render: function() {
		return (
			<div className="top">
				<div className="banner">
					<div className="logo">W</div>
				</div>
				<WhereAtom route={this.props.route}/>
				<UserAtom username={this.props.username}/>
			</div>
		);
	}
});

var WhereAtom = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return this.state;
	},
	render: function() {
		return (
			<div className="whereAmI">
				<HereAtom route={this.props.route}  />
				<NearAtom route={this.props.route} />
			</div>
		);
	}
})

var HereAtom = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return this.state;
	},
	goToWhere: function() {
		Router.go("/here");
	},
	createClassname: function() {
		var className = "where here";
		if (this.props.route.indexOf("here") != -1) {
			className += " selected"
		}
		return className;
	},
	render: function() {
		return (
			<div className={this.createClassname()} onClick={this.goToWhere}>
				<div className="badge">#here</div>
			</div>
		);
	}
});

var UserAtom = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return this.state;
	},
	isHover: function() {
		console.log("hoverrrr")
		this.setState({"isHover": true});
	},
	isLeave: function() {
		console.log("cyaaa")
		this.setState({"isHover": false});
	},
	logout: function() {
		Meteor.logout();
	},
	displayText: function() {
		if (this.state.isHover) {
			return "log out"
		} else {
			return this.props.username;
		}
	},
	render: function() {
		return (
			<div className="user"  onMouseEnter={this.isHover} onMouseLeave={this.isLeave} onClick={this.logout}>{this.displayText()}</div>
		);
	}
})

var NearAtom = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return this.state;
	},
	goToWhere: function() {
		Router.go("/near");
	},
	createClassname: function() {
		var className = "where near";
		if (this.props.route.indexOf("near") != -1) {
			className += " selected"
		}
		return className;
	},
	render: function() {
		return (
			<div className={this.createClassname()} onClick={this.goToWhere}>
				<div className="badge">#near</div>
			</div>
		);
	}
});