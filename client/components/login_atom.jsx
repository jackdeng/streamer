/** @jsx React.DOM */
LoginAtom = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getInitialState: function() {
		// two phases: signin or register
		return {"register": false};
	},
	getMeteorState: function() {
		return this.state;
	},
	chooseLoginView: function() {
		return this.state.register ? 
			(<RegisterCard />) : 
			(<LoginCard />);
	},
	handleToggleRegister: function() {
		this.setState({
			"register": !this.state.register
		});
	},
	render: function() {
		return (
			<div className="loginOverlay">
				<div className="loginBody">
					<PrismaticBackground />
					{this.chooseLoginView()}
					<div className="loginFooter">
						<RegisterFlag handleToggle={this.handleToggleRegister} registerFlag={this.state.register} />
						<ConfirmButton registerFlag={this.state.register}/>
					</div>
				</div>
			</div>
		);
	}
});

var ConfirmButton = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getInitialState: function() {
		return {};
	},
	getMeteorState: function() {
		return this.state; 
	},
	render: function() {
		return (
			<div id="confirmLogin"> 
				go!
			</div>
		);
	}
});

var RegisterFlag = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getInitialState: function() {
		return {};
	},
	getMeteorState: function() {
		return this.state; 
	},
	render: function() {
		var classes = "";
		if (!this.props.registerFlag) {
			classes += " off"
		}

		return (
			<div className={classes} id="registerFlag" onClick={this.props.handleToggle}> 
				register
			</div>
		);
	}
});

var LoginCard = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getInitialState: function() {
		return {};
	},
	getMeteorState: function() {
		return this.state; 
	},
	render: function() {
		return (
			<div className="loginContainer signin">
				<EmailField></EmailField>
				<PasswordField></PasswordField>
			</div>
		);
	}
});

var RegisterCard = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getInitialState: function() {
		return {};
	},
	getMeteorState: function() {
		return this.state; 
	},
	render: function() {
		return (
			<div className="loginContainer register">
				<EmailField></EmailField>
				<NameField></NameField>
				<PasswordField></PasswordField>
			</div>
		);
	}
});

var EmailField = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getInitialState: function() {
		return {data: ""};
	},
	getMeteorState: function() {
		return this.state;
	},
	render: function() {
		return (
			<div className="loginEntry emailContainer">
				<input placeholder="email"></input>
			</div>
		);
	}
});

var PasswordField = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getInitialState: function() {
		return {data: ""};
	},
	getMeteorState: function() {
		return this.state;
	},
	render: function() {
		return (
			<div className="loginEntry passwordContainer">
				<input placeholder="password"></input>
			</div>
		);
	}
});

var NameField = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getInitialState: function() {
		return {data: ""};
	},
	getMeteorState: function() {
		return this.state;
	},
	render: function() {
		return (
			<div className="loginEntry nameContainer">
				<input className="firstName" placeholder="first"></input>
				<input className="lastName" placeholder="last"></input>
			</div>
		);
	}
});

var PrismaticBackground = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getInitialState: function() {
		return {};
	},
	getMeteorState: function() {
		return this.state;
	},
	render: function() {
		return (
			<div className="prismContainer">
				<div className="prism" data-num="0"/>
				<div className="prism" data-num="1"/>
				<div className="prism" data-num="2"/>
				<div className="prism" data-num="3"/>
				<div className="prism" data-num="4"/>
				<div className="prism" data-num="5"/>
			</div>
		);
	}
});
