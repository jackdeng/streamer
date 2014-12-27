/** @jsx React.DOM */

PaginatorAtom = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return this.state;
	},
	render: function() {
		return (
			<div className="pagination">
				<div className="button">M</div>
			</div>
		);
	}
});