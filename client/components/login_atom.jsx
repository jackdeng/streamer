/** @jsx React.DOM */
LoginAtom = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getInitialState: function() {
		return {"register": false};
	},
	getMeteorState: function() {
		return this.state;
	},
	handleToggleRegister: function() {
		this.setState({
			"register": !this.state.register
		});
	},
	submitForm: function() {
		var loginInfo = this.refs.loginForm.getInformation();

		if (this.state.register) {
			// register
			Accounts.createUser(loginInfo);
		} else {
			// login
			Meteor.loginWithPassword(loginInfo.email, loginInfo.password);
		}
	},
	render: function() {
		return (
			<div className="loginOverlay">
				<div className="loginBody">
					<PrismaticBackground />
					<LoginCard ref="loginForm" registerFlag={this.state.register} />
					<div className="loginFooter">
						<RegisterFlag handleToggle={this.handleToggleRegister} registerFlag={this.state.register} />
						<ConfirmButton submitForm={this.submitForm} registerFlag={this.state.register}/>
					</div>
				</div>
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
	getInformation: function() {
		var info = {
			"email": this.refs.email.getEmail(),
			"password": this.refs.password.getPassword(),
		};

		// if we are registering, include the users' names.
		if (this.props.registerFlag) {
			var profile =  {
				"Name": this.refs.name.getFullName(),
				"firstName": this.refs.name.getFirstName(),
				"lastName": this.refs.name.getLastName()
			};

			info.profile = profile;
		}

		return info;
	},
	displayNameField: function() {
		if (this.props.registerFlag) {
			return (
				<NameField ref="name"></NameField>
			);
		};
	},
	render: function() {
		return (
			<div className="loginContainer login">
				<EmailField ref="email"></EmailField>
				{this.displayNameField()}
				<PasswordField ref="password"></PasswordField>
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
			<div id="confirmLogin" onClick={this.props.submitForm}> 
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

var EmailField = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getInitialState: function() {
		return {};
	},
	getMeteorState: function() {
		return this.state;
	},
	getEmail: function() {
		return this.refs.email.getDOMNode().value.trim();
	},
	render: function() {
		return (
			<div className="loginEntry emailContainer">
				<input ref="email" placeholder="email"></input>
			</div>
		);
	}
});

var PasswordField = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getInitialState: function() {
		return {};
	},
	getMeteorState: function() {
		return this.state;
	},
	getPassword: function() {
		return this.refs.password.getDOMNode().value.trim();
	},
	render: function() {
		return (
			<div className="loginEntry passwordContainer">
				<input ref="password" placeholder="password"></input>
			</div>
		);
	}
});

var NameField = React.createClass({
	mixins: [ReactMeteor.Mixin],
	getInitialState: function() {
		return {};
	},
	getMeteorState: function() {
		return this.state;
	},
	getLastName: function() {
		return this.refs.last.getDOMNode().value.trim();
	},
	getFirstName: function() {
		return this.refs.first.getDOMNode().value.trim();
	},
	getFullName: function() {
		return this.getFirstName() + " " + this.getLastName(); 
	},
	render: function() {
		return (
			<div className="loginEntry nameContainer">
				<input ref="first" className="firstName" placeholder="first"></input>
				<input ref="last" className="lastName" placeholder="last"></input>
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
