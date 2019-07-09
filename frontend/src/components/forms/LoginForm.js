import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Box, Button, Form, FormField, TextInput } from "grommet";
import { Login } from "grommet-icons";
import axios from "axios";

//========================================= Login Form
class LoginForm extends Component {
	state = {
		uname: "",
		pwd: "",
		toCatalog: false
	};
	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		let { logIn } = this.props;
		this.setState(() => ({
			toCatalog: true
		}));

		let data = {
			username: this.state.username,
			password: this.state.password
		};

		axios
			.post("http://3.86.206.101:7099/login", data)

			.then(response => {
				console.log(response);
			})

			.catch(error => {
				console.log(error);
			});

		logIn(this.state.username);
	};

	render() {
		if (this.state.toCatalog === true) {
			return <Redirect to="/catalog" />;
		}

		return (
			<Box width="small" align="center" gap="medium" fill>
				<Form>
					<FormField label="Username:">
						<TextInput id="uname" onChange={this.handleChange} />
					</FormField>
					<FormField label="Password:">
						<TextInput type="password" id="pwd" onChange={this.handleChange} />
					</FormField>
				</Form>
				<Link to="/catalog">
					<Button
						color="brand"
						label="Login"
						gap="xsmall"
						icon={<Login size="medium" color="brand" />}
						onClick={this.handleSubmit}
					/>
				</Link>
			</Box>
		);
	}
}

export default LoginForm;
