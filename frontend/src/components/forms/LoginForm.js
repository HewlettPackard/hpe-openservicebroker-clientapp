import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Form, FormField, Grid, TextInput } from 'grommet';
import { Login } from 'grommet-icons';


//========================================= Login Form
const LoginForm = () => (
  <Box width='small' align='center' gap='medium' fill> 
    <Form>
      <FormField label='Username:'>
        <TextInput plain />
      </FormField>
      <FormField label='Password:'>
        <TextInput type='password' />
      </FormField>
    </Form>
    <Link to='/'>
      <Button
        color='brand'
        label='Login'
        gap='xsmall'
        icon={<Login size='medium' color='brand' />}
      />
    </Link>
  </Box>
)

export default LoginForm;