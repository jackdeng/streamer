/** @jsx React.DOM */

/** Embished Cards **/
EmbelishCard = React.createClass({
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
				<MediaBlock data={this.props.data}></MediaBlock>
				<InfoBlock data={this.props.data}></InfoBlock>
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
		}
	},
	insertMedia: function() {
		// valid
		if (this.props.data.media.type && this.props.data.media.type != "photo") {
			// TODO prevent XSS attack.
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

var InfoBlock = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return this.state;
	},
	render: function() {
		// TODO: don't render the HTML at all if it's empty.
		// Currenly, we're rendering empty block and in style div:empty display:none.
		// Move validity check to parent. IE, if title is valid, render title to DOM.
		return (
			<div className="infoBlock">
				<CardTitle data={this.props.data} title={this.props.data.title} url={this.props.data.url} />
				<div className="description">
					{this.props.data.description}
				</div>
			</div>
		);
	}
})

var CardTitle = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getMeteorState: function() {
		return this.state;
	},
	getTitleText: function() {
		// check to see if the title would be a generic extension.
		var title = this.props.title;
		var extensionMap = [".jpg", ".png", ".gif", "jpeg"];
		var isExtension = false;

		if (!title) {
			return;
		}

		for (var i=0; i < extensionMap.length; i++) {
			var extension = extensionMap[i];
			if (title.indexOf(extension) > 0) {
				isExtension = true;
				break;
			};
		}

		if (!isExtension) {
			return title;
		}
	},
	createCardTitle: function() {
		var title = this.getTitleText();

		if (title) {
			return (
				<div className="content">
					<BadgeBlock data={this.props.data}></BadgeBlock>
					<a className="title" href={this.props.url} target="_blank">
						<span>
							{title}
						</span>
					</a>
				</div>
			)
		}
	},
	render: function() {
		return (
			<div className="titleContainer">
				{this.createCardTitle()}
			</div>
		);
	}
});

/** Embedly Cards **/
EmbedlyCard = React.createClass({
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
BasicCard = React.createClass({
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