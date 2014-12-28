/** @jsx React.DOM */

PaginatorAtom = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return this.state;
	},
	showMore: function() {
		var POST_INCREMENT = 5;
		Session.set("postLimit", Session.get("postLimit") + POST_INCREMENT);
	},
	render: function() {
		return (
			<div className="pagination">
				<div className="button" onClick={this.showMore}>M</div>
			</div>
		);
	}
});