import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Box, Button, Form, FormField } from 'grommet';
import { Login } from 'grommet-icons';
import axios from 'axios';
import hpeLogo from './../../assets/images/hpe_pri_grn_rev_rgb.png';
import Footer from './../footer/Footer';

//========================================= Login Form
class LoginForm extends Component {
  state = {
    username: 'user',
    password: 'password',
    invalidError: '',
    toCatalog: false
  };

  handleSubmit = ({ username, password }) => {
    const { logIn } = this.props;

    if (username === this.state.username && password === this.state.password) {
      this.setState(() => ({
        invalidError: '',
        toCatalog: true
      }));
      logIn(this.state.uname);
    } else this.setState({ invalidError: 'invalid username or password' });

    // let data = {
    //   username: this.state.username,
    //   password: this.state.password
    // };
    // axios
    //   .post('http://', data)
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  componentWillMount() {
    this.props.hideSideBar();
  }

  render() {
    if (this.state.toCatalog === true) {
      return <Redirect to='/catalog' />;
    }

    return (
      <Box fill>
        <Box
          fill
          pad='large'
          gap='large'
          align='center'
          justify='center'
          overflow={{ vertical: 'auto' }}
          background={{ image: 'linear-gradient(210deg,grey 20%,black)' }}
        >
          <Box className='hpe-logo' height='100px' flex={false}>
            <img src={hpeLogo} alt='logo' height='100px' />
          </Box>
          <Box
            flex={false}
            gap='medium'
            width='medium'
            align='center'
            height='medium'
            justify='center'
            animation='fadeIn'
            elevation='medium'
            background={{ color: 'white' }}
            border={{ color: 'light-5', size: 'small' }}
          >
            <Form onSubmit={({ value }) => this.handleSubmit({ ...value })}>
              <FormField
                label='Username:'
                name='username'
                error={this.state.invalidError}
              />
              <FormField
                label='Password:'
                type='password'
                name='password'
                error={this.state.invalidError}
              />
              <Box align='center'>
                <Button
                  color='brand'
                  label='Log In'
                  margin='medium'
                  type='submit'
                  icon={<Login size='medium' color='brand' />}
                />
              </Box>
            </Form>
          </Box>
        </Box>
        <Box width='100%' background='light-2' align='center' flex={false}>
          <Footer />
        </Box>
      </Box>
    );
  }
}

export default LoginForm;
