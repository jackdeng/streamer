/** @jsx React.DOM */
var streamAtom = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getInitialState: function() {
		return {data: []};
	},
	getMeteorState: function() {
		return this.state;
	},
	loadFromServer: function() {
		var xhr = new XMLHttpRequest();
	    var endpointURL = "http://localhost:3009/cards";
	    console.log("endpoint is: " + endpointURL);

	    xhr.open("GET", endpointURL, true);
	    xhr.setRequestHeader("Content-type", "application/json");
	    xhr.onreadystatechange = function() {
	      if (xhr.status === 200 && xhr.readyState === 4) {
	        var data = JSON.parse(xhr.response);
	        this.setState({"data": data}); 
	      }
	    }.bind(this); 

	    xhr.send();
	},
	componentDidMount: function() {
		this.loadFromServer();
	},
	createCards: function() {
		var cards = this.state.data.map(function(data) {
			return (
				<Card title={data.title} url={data.url}></Card>
			);
		});	

		return cards;
	},
	render: function() {
		console.log("rendering streamAtom");
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
		return {};
	},
	render: function() {
		return (
			<div className='card'>
				<a href={this.props.url} className="article" target='_blank'>{this.props.title}</a>
			</div>
		);
	}
})
