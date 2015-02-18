/** @jsx React.DOM */
StreamAtom = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getInitialState: function() {
		return {
			data: this.props.data,
			route: this.props.route
		};
	},
	getMeteorState: function() {
		return this.state;
	},
	componentWillReceiveProps: function(nextProps) {
		// reset the data when new data is fetched an sent.
		this.setState({
			"data": nextProps.data || {},
			"route": nextProps.route || ""
		});
	},
	getChatRoom: function(url) {
		query = {
			"url": url
		}
		return Chat.findOne(query);
	},
	createCards: function() {
		var cards = this.state.data.map(function(data) {
			var chatRoom = this.getChatRoom(data.url);
			console.log("COMMENT: " + JSON.stringify(data.comment));
			return (
				<div className="sleeve">
					<EmbelishCard data={data}></EmbelishCard>
					<ChatAtom comment={data.comment} url={data.url} chatRoom={chatRoom} posters={data.posters}></ChatAtom>
				</div>
			)
		}, this);

		return cards;
	},
	render: function() {
		return (
			<div className="content">
				<BannerAtom route={this.props.route} username={this.props.username}/>
				<div className="stream">
					{this.createCards()}
				</div>
				<PaginatorAtom />
			</div>
		);
	}
});
