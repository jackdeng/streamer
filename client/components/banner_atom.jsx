/** @jsx React.DOM */

BannerAtom = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return this.state;
	},
	render: function() {
		return (
			<div className="banner">
				<div className="logo">W</div>
			</div>
		);
	}
});