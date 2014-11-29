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
				<EmbelishCard data={data}></EmbelishCard>
				// <Card title={data.title} url={data.url}></Card>
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

/** Embished Cards **/
var EmbelishCard = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return this.state;
	},
	isVerticalImage: function() {
		// TODO: cache the image being used. Not bothering right now, don't want to fuck with states.
		var images = this.props.data.images;
		if (images.length > 0) {
			var image = images[0];
			return (image.height >= image.width) && (image.width < 530); 
		}
	},
	hasImage: function() {
		return this.props.data.images.length > 0;
	},
	isColumn: function() {
		// TODO: refactor logic to be simpler.
		// conditions for card column/row display
		// column if there's a rich media element
		// row if there no images and no rich media, display favicon
		// column if landscape image
		// row if portrait or square image.
		var images = this.props.data.images;

		if (this.props.data.media.type && this.props.data.media.type != "photo") {
			return true;
		}
		if (!this.hasImage()) {
			return false;
		}
		if (!this.isVerticalImage()) {
			return true;
		}
		return false;	
	},
	createClassNames: function() {
		var classNames = "embelish card ";

		if (this.isColumn()) {
			classNames += "column ";
		} else {
			classNames += "row ";
		}

		return classNames;
	},
	render: function() {
		return (
			<div className={this.createClassNames()}>
				<BadgeBlock data={this.props.data}></BadgeBlock>
				<MediaBlock data={this.props.data}></MediaBlock>
				<DescriptionBlock data={this.props.data}></DescriptionBlock>
			</div>
		);
	}
});

var BadgeBlock = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return this.state;
	},
	render: function() {
		return ( 
			<div className="badges">
				<div className="favicon">
					<a href={this.props.data.provider_url} target="_blank">
						<img src={this.props.data.favicon_url} />
					</a>
				</div>
			</div>
		);
	}
})

var MediaBlock = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return this.state;
	},
	getImageSource: function() {
		var images = this.props.data.images;
		if (images.length > 0) {
			var image = images[0];
			return image.url; 
		} else {
			return this.props.data.favicon_url;
		}
	},
	insertMedia: function() {
		// valid
		if (this.props.data.media.type && this.props.data.media.type != "photo") {
			var converter = new Showdown.converter();
			var rawMarkup = converter.makeHtml(this.props.data.media.html);
			return (
				<div dangerouslySetInnerHTML={{__html: rawMarkup}} />
			)
		}
		else {
			return (
				<a className="title" href={this.props.data.url} target="_blank">
					<img className="image" src={this.getImageSource()}></img>
				</a>
			)
		}
	},
	render: function() {
		return (
			<div className= "media">
				{this.insertMedia()}
			</div>
		);
	}
});

var DescriptionBlock = React.createClass({
	mixins: [ReactMeteor.Mixin], 
	getMeteorState: function() {
		return this.state;
	},
	render: function() {
		return (
			<div className="infoBlock">
				<a className="title" href={this.props.data.url} target="_blank">
					{this.props.data.title}
				</a>
				<div className="description">
					{this.props.data.description}
				</div>
			</div>
		);
	}
})

/** Embedly Cards **/
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

/** Basic Cards **/
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