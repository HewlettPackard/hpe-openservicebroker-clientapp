import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Box, Button, Form, FormField, Heading, TextInput } from "grommet";
import axios from "axios";

//========================================= Register Form
class RegisterForm extends Component {
	state = {
		sname: "",
		url: "",
		uname: "",
		pwd: ""
	};

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = e => {
		let data = {
			sname: this.state.sname,
			url: this.state.url,
			uname: this.state.uname,
			pwd: this.state.pwd,
			toCatalog: false
		};

		this.setState(() => ({
			toCatalog: true
		}));

		axios
			.post("http://3.86.206.101:7099/register", data)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
	};
	render() {
		if (this.state.toCatalog === true) {
			return <Redirect to="/catalog" />;
		}
		return (
			<Box align="center" justify="start" pad="medium" flex>
				<Heading size="medium" level="2">
					Register service
				</Heading>
				<Form>
					<FormField label="Service name">
						<TextInput
							id="sname"
							value={this.state.sname}
							onChange={this.handleChange}
						/>
					</FormField>
					<FormField
						label="URL"
						help="Use https for secure connection. Ex: https://127.0.0.1:7009"
					>
						<TextInput
							id="url"
							value={this.state.url}
							onChange={this.handleChange}
						/>
					</FormField>
					<FormField label="Username">
						<TextInput
							id="uname"
							placeholder="Username used to login to broker"
							value={this.state.uname}
							onChange={this.handleChange}
						/>
					</FormField>
					<FormField label="Password">
						<TextInput
							id="pwd"
							value={this.state.pwd}
							onChange={this.handleChange}
						/>
					</FormField>
					<Link to="/catalog">
						<Button
							label="Submit"
							margin={{ top: "medium", left: "35%" }}
							onClick={this.handleSubmit}
						/>
					</Link>
				</Form>
			</Box>
		);
	}
}

export default RegisterForm;
