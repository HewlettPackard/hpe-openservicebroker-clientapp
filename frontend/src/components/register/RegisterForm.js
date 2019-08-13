import React, { useState } from 'react';
import { Box, Button, Form, FormField, Heading, Layer, Text } from 'grommet';
import { Add, Checkmark, Close, FormClose } from 'grommet-icons';
import axios from 'axios';

//========================================= Register Form
const RegisterForm = props => {
  const {
    broker,
    brokers,
    editing,
    toggleDetails,
    toggleEdit,
    submitEdit,
    toggleRegisterForm,
    updateBrokers,
    updateServices
  } = props;

  const [canPress, setCanPress] = useState(true);

  const validateName = fieldVal => {
    if (broker === undefined) {
      if (fieldVal === ' ') return 'required';
      for (let i = 0; i < brokers.length; i++)
        if (brokers[i].name === fieldVal)
          return 'This name is already used for another broker.';
      return '';
    } else {
      if (fieldVal === ' ') return 'required';
      for (let i = 0; i < brokers.length; i++)
        if (brokers[i].name === fieldVal && broker.name !== fieldVal)
          return 'This name is already used for another broker.';
      return '';
    }
  };

  const validateURL = fieldVal => {
    const regexp = /https?:\/\/.+/;
    if (!regexp.test(fieldVal)) return 'must begin with http:// or https://';
    for (let i = 0; i < brokers.length; i++)
      if (brokers[i].inputs[0].url === fieldVal)
        return 'This url is already used for another broker.';
    return '';
  };

  const handleSubmit = ({ name, url, username, password, description }) => {
    var date = new Date();

    let broker = {
      name,
      description,
      url,
      status: 'loading',
      time: `${date.toTimeString()}  ${date.toLocaleDateString()}`,
      inputs: [{ username }]
    };

    const base64encodedData = new Buffer(username + ':' + password).toString(
      'base64'
    );
    const serviceUrl = url;
    axios
      .get(`${url}/v2/catalog`, {
        headers: {
          Authorization: 'Basic ' + base64encodedData,
          'X-Broker-API-Version': 2.14
        }
      })
      .then(results => {
        broker.status = 'loaded';
        updateServices(results.data.services, serviceUrl);
        updateBrokers('add', broker);
        toggleRegisterForm();
      })
      .catch(error => {
        alert('Failed to register');
      })
      .then(() => setCanPress(true));
  };

  if (!editing)
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
              <Form
                onSubmit={({ value }) => {
                  handleSubmit(value);
                  setCanPress(false);
                }}
              >
                <FormField
                  name='name'
                  label='Broker name'
                  placeholder='Name the broker'
                  required
                  validate={validateName}
                />
                <FormField
                  name='description'
                  label='Description'
                  placeholder='Optional broker description'
                />
                <FormField
                  name='url'
                  label='URL'
                  placeholder='Use https for secure connection. Ex: https://127.0.0.1:7009'
                  required
                  validate={validateURL}
                />
                <FormField
                  name='username'
                  label='Username'
                  placeholder='Username used to login to broker'
                  required
                />
                <FormField
                  name='password'
                  label='Password'
                  placeholder='Password used to login to broker'
                  type='password'
                  required
                />
                <Box align='center'>
                  <Button
                    label='Submit'
                    type='submit'
                    margin='medium'
                    disabled={!canPress}
                    icon={<Add />}
                  />
                </Box>
              </Form>
            </Box>
          </Box>
        </Box>
      </Layer>
    );
  else {
    const { name, description, status, time } = broker;
    const url = broker.url;
    const username = broker.inputs[0].username;

    return (
      <Layer full plain onEsc={toggleDetails} animate={false}>
        <Box direction='row' fill>
          <Box
            flex
            background={{ color: 'black', opacity: 'medium' }}
            onClick={toggleDetails}
          />
          <Box
            background={{ color: 'dark-1' }}
            overflow={{ vertical: 'scroll' }}
            width='large'
            pad='small'
          >
            <Box className='editing-header' direction='row' flex={false}>
              <Box justify='center' flex>
                <Button
                  icon={<FormClose size='large' color='accent-1' />}
                  onClick={toggleDetails}
                />
              </Box>
              <Box align='center' flex pad={{ top: 'small' }}>
                <Text size='xxlarge' weight='bold' wordBreak='break-all'>
                  Edit {name}
                </Text>
              </Box>
              <Box flex /> {/* empty box to center title */}
            </Box>
            <Box
              className='editing-content'
              width='large'
              pad='medium'
              flex={false}
            >
              <Form
                onSubmit={({ value }) => {
                  const { name, description } = value;
                  submitEdit({
                    name,
                    description,
                    status,
                    time,
                    url,
                    username
                  });
                }}
              >
                <FormField
                  name='name'
                  label='Broker name'
                  value={name}
                  required
                  validate={validateName}
                />
                <FormField
                  name='description'
                  label='Optional broker description'
                  value={description}
                />
                <Box align='center'>
                  <Button
                    label='Submit Changes'
                    type='submit'
                    margin='medium'
                    icon={<Checkmark />}
                  />
                </Box>
              </Form>
              <Box align='center'>
                <Button
                  label='Cancel'
                  icon={<Close />}
                  onClick={() => toggleEdit()}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Layer>
    );
  }
};

export default RegisterForm;
