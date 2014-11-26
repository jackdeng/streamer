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
			"data": nextProps.data
		});
	},
	createCards: function() {
		var cards = this.state.data.map(function(data) {
			return (
				<Card title={data.title} url={data.url}></Card>
				// <EmbedlyCard url={data.url}></EmbedlyCard>
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

var Card = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return this.state;
	},
	render: function() {
		return (
			<div className='card'>
				<a href={this.props.url} className="article" target='_blank'>{this.props.title}</a>
			</div>
		);
	}
});

var EmbedlyCard = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return this.state;
	},
	render: function() {
		return (
			<div className='card'>
				<a href={this.props.url} className="article embedly-card" data-card-chrome="0"></a>
			</div>
		);
	}
});