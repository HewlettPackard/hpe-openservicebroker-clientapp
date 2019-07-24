import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Box, Button, Form, FormField, TextInput } from 'grommet';
import { Login } from 'grommet-icons';
import axios from 'axios';
import hpeLogo from './../../assets/images/hpe_pri_grn_rev_rgb.png';

//========================================= Login Form
class LoginForm extends Component {
	state = {
		uname: '',
		pwd: '',
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
			.post('http://3.86.206.101:7099/login', data)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});

		logIn(this.state.uname);
	};

	componentWillMount() {
		this.props.hideSideBar();
	}


	render() {
		if (this.state.toCatalog === true) {
			return <Redirect to='/catalog' />;
		}

		return (
			<Box pad='large' justify='center' align='center' fill gap='large' background={{ image: 'linear-gradient(210deg,grey 20%,black)' }}>
				{/*<Box justify='center' align='center' fill background={{ image: 'linear-gradient(210deg,#01a982 20%,#614767)' }}>*/}
				{/* <Box justify='center' align='center' fill className='login-form-image'> */}
				<Box className='hpe-logo' height='100px' flex={false}>
					<img src={hpeLogo} alt='logo' height='100px' />
				</Box>
				<Box
					animation='fadeIn'
					elevation='medium'
					border={{ color: 'light-5', size: 'small' }}
					background={{ color: 'white' }}
					justify='center'
					align='center'
					gap='medium'
					width='medium'
					height='medium'
					flex={false}
				>
					<Form>
						<FormField label='Username:'>
							<TextInput id='uname' onChange={this.handleChange} />
						</FormField>
						<FormField label='Password:'>
							<TextInput type='password' id='pwd' onChange={this.handleChange} />
						</FormField>
					</Form>
					<Link to='/catalog'>
						<Button
							color='brand'
							label='Login'
							gap='xsmall'
							icon={<Login size='medium' color='brand' />}
							onClick={this.handleSubmit}
						/>
					</Link>
				</Box>
			</Box>
		);
	}
}

export default LoginForm;
