/** @jsx React.DOM */
NotFoundAtom = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return this.state;
	},
	render: function() {
		return (
			<div>Sorry, the page could not be found.</div>	
		);
	}
});
