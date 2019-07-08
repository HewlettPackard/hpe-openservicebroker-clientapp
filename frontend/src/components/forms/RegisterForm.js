import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Form, FormField, Heading, TextInput } from "grommet";
import axios from "axios";

//========================================= Register Form
class RegisterForm extends Component {
  render() {
    return (
      <Box  align='center' justify="start" pad="medium" flex>
        <Heading size="medium" level="2">
          Register service
        </Heading>
        <Form>
          <FormField label="Name" help="Name of the service">
            <TextInput />
          </FormField>
          <FormField
            label="URL"
            help="Use https for secure connection. Ex: https://127.0.0.1:7009"
          >
            <TextInput />
          </FormField>
          <FormField label="Username" help="Username used to login to broker">
            <TextInput />
          </FormField>
          <FormField label="Password">
            <TextInput />
          </FormField>
          <Link to='/catalog'>
            <Button label="Submit" margin={{ top: 'medium', left: '35%' }} />
          </Link>
        </Form>
      </Box>
    );
  }
}

export default RegisterForm;
