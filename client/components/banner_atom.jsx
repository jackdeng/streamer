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
				<HereAtom />
				<NearAtom />
			</div>
		);
	}
});

var HereAtom = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return this.state;
	},
	goToWhere: function() {
		Router.go("/here");
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
	render: function() {
		return (
			<div className="where near">
				<div className="badge" onClick={this.goToWhere}>#near</div>
			</div>
		);
	}
});