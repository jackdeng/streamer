/** @jsx React.DOM */
BannerAtom = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		console.log("hey in banner atom, eh the route could be: " + this.props.route)
		return this.state;
	},
	render: function() {
		return (
			<div className="top">
				<div className="banner">
					<div className="logo">W</div>
				</div>
				<WhereAtom route={this.props.route}/>
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
		var classeName = "where here";
		if (this.props.route.indexOf("here") > 0) {
			className += " selected"
		}
		return className;
	},
	render: function() {
		return (
			<div className="where here">
				<div className="badge" onClick={this.goToWhere}>#here</div>
			</div>
		);
	}
});

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
		if (this.props.route.indexOf("near") > 0) {
			className += " selected"
		}
		return className;
	},
	render: function() {
		return (
			<div className={this.createClassname()}>
				<div className="badge" onClick={this.goToWhere}>#near</div>
			</div>
		);
	}
});