import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Form, FormField, TextInput } from 'grommet';
import { Login } from 'grommet-icons';


//========================================= Login Form
class LoginForm extends Component {
   username = {};
  
  render() {
    let { logIn } = this.props;

    return (
      <Box width='small' align='center' gap='medium' fill> 
        <Form>
          <FormField label='Username:'>
            <TextInput plain ref={(input) => this.username = input} />
          </FormField>
          <FormField label='Password:'>
            <TextInput type='password' />
          </FormField>
        </Form>
        <Link to='/catalog'>
          <Button
            color='brand'
            label='Login'
            gap='xsmall'
            icon={<Login size='medium' color='brand' />}
            onClick={() => logIn(this.username.value)}
          />
        </Link>
      </Box>
    )
  }
}

export default LoginForm;