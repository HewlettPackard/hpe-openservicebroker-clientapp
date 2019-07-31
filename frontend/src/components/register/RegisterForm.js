import React, { Component } from 'react';
import { Box, Button, Form, FormField, Heading, Layer } from 'grommet';
import { Add, FormClose } from 'grommet-icons';
import axios from 'axios';
import config from '../../config';

//========================================= Register Form
const RegisterForm = props => {
  const { brokers, toggleRegisterForm, updateBrokers } = props;

  const validateName = fieldVal => {
    for (let i = 0; i < brokers.length; i++)
      if (brokers[i].name === fieldVal)
        return 'This name is already used for another broker.';
    return '';
  };

  const handleSubmit = ({ name, url, uname, pwd }) => {
    let data = {
      name,
      url,
      uname,
      pwd
    };

    var date = new Date();

    let broker = {
      name: name,
      status: 'loading',
      time: `${date.toTimeString()}  ${date.toLocaleDateString()}`,
      inputs: [{ url: url }, { uname: uname }, { pwd: pwd }]
    };

    axios
      .post(`${config.apiUrl}/register`, data)
      .then(response => {
        console.log(response);
        broker.status = 'loaded';
      })
      .catch(error => {
        console.log(error);
        broker.status = 'failed';
      })
      .then(() => {
        updateBrokers('add', broker);
        toggleRegisterForm();
      });
  };

  return (
    <Layer full plain onEsc={toggleRegisterForm} animate={false}>
      <Box direction='row' fill>
        <Box
          flex
          background={{ color: 'black', opacity: 'medium' }}
          onClick={toggleRegisterForm}
        />
        <Box
          background={{ color: 'dark-1' }}
          overflow={{ vertical: 'scroll' }}
          width='large'
          pad='small'
        >
          <Box className='register-form-header' direction='row' flex={false}>
            <Box justify='center' flex>
              <Button
                icon={<FormClose size='large' color='accent-1' />}
                onClick={toggleRegisterForm}
              />
            </Box>
            <Box align='center' flex>
              <Heading level='2'>Register Broker</Heading>
            </Box>
            <Box flex /> {/* empty box to center heading */}
          </Box>
          <Box
            className='register-form-content'
            width='large'
            pad='medium'
            flex={false}
          >
            <Form onSubmit={({ value }) => handleSubmit(value)}>
              <FormField
                name='name'
                label='Broker name'
                placeholder='Name the broker'
                required
                validate={validateName}
              />
              <FormField
                name='url'
                label='URL'
                placeholder='Use https for secure connection. Ex: https://127.0.0.1:7009'
                required
                validate={{
                  regexp: /https:\/\/.+/,
                  message: 'must begin with https://'
                }}
              />
              <FormField
                name='uname'
                label='Username'
                placeholder='Username used to login to broker'
                required
              />
              <FormField
                name='pwd'
                label='Password'
                placeholder='Password used to login to broker'
                required
              />
              <Box align='center'>
                <Button
                  label='Submit'
                  type='submit'
                  margin='medium'
                  icon={<Add />}
                />
              </Box>
            </Form>
            <Box align='center' />
          </Box>
        </Box>
      </Box>
    </Layer>
  );
};

export default RegisterForm;
