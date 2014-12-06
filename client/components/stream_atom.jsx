/** @jsx React.DOM */
StreamAtom = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getInitialState: function() {
		return {data: this.props.data};
	},
	getMeteorState: function() {
		return this.state;
	},
	componentWillReceiveProps: function(nextProps) {
		// reset the data when new data is fetched an sent.
		this.setState({
			"data": nextProps.data || {}
		});
	},
	createCards: function() {
		var cards = this.state.data.map(function(data) {
			return (
				<div className="sleeve">
					<EmbelishCard data={data}></EmbelishCard>
					<ChatAtom></ChatAtom>
				</div>
			);
		});	

		return cards;
	},
	render: function() {
		return (
			<div className="stream">
				{this.createCards()}
			</div>	
		);
	}
});
