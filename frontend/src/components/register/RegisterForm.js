import React, { Component } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Layer,
  Text,
  TextInput
} from 'grommet';
import { Add, FormClose } from 'grommet-icons';
import axios from 'axios';
import config from '../../config';

//========================================= Register Form
class RegisterForm extends Component {
  state = {
    name: '',
    url: '',
    uname: '',
    pwd: '',
    emptyNameError: false,
    emptyValueError: false,
    sameNameError: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = () => {
    const { name, url, uname, pwd } = this.state;

    this.setState({
      emptyNameError: false,
      emptyValueError: false,
      sameNameError: false
    });

    if (this.state.name === '') {
      this.setState({ emptyNameError: true });
      return;
    }

    const { brokers } = this.props;
    for (let i = 0; i < brokers.length; i++) {
      if (brokers[i].name === this.state.name) {
        this.setState({ sameNameError: true });
        return;
      }
    }

    if (url === '' || uname === '' || pwd === '') {
      this.setState({ emptyValueError: true });
      return;
    }

    let data = {
      name: name,
      url: url,
      uname: uname,
      pwd: pwd
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
        this.props.updateBrokers('add', broker);
        this.props.toggleRegisterForm();
      });
  };

  render() {
    const { toggleRegisterForm } = this.props;
    const {
      name,
      url,
      emptyNameError,
      sameNameError,
      emptyValueError
    } = this.state;

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
              <Form>
                <FormField label='Broker name'>
                  <TextInput
                    id='name'
                    placeholder='Name the broker'
                    value={name}
                    onChange={this.handleChange}
                  />
                </FormField>
                <FormField label='URL'>
                  <TextInput
                    id='url'
                    placeholder='Use https for secure connection. Ex: https://127.0.0.1:7009'
                    value={url}
                    onChange={this.handleChange}
                  />
                </FormField>
                <FormField label='Username'>
                  <TextInput
                    id='uname'
                    placeholder='Username used to login to broker'
                    value={this.state.uname}
                    onChange={this.handleChange}
                  />
                </FormField>
                <FormField label='Password'>
                  <TextInput
                    type='password'
                    id='pwd'
                    placeholder='Password used to login to broker'
                    value={this.state.pwd}
                    onChange={this.handleChange}
                  />
                </FormField>
              </Form>
              <Box
                width='medium'
                align='center'
                alignSelf='center'
                margin='medium'
                flex={false}
              >
                <Button
                  label='Submit'
                  margin='medium'
                  flex={false}
                  icon={<Add />}
                  onClick={() => this.handleSubmit(name, url)}
                />
              </Box>
              <Box align='center'>
                {emptyNameError && (
                  <Box>
                    <Text
                      wordBreak='break-all'
                      color='status-error'
                      size='large'
                    >
                      You must name the broker.
                    </Text>
                  </Box>
                )}
                {sameNameError && (
                  <Box>
                    <Text
                      wordBreak='break-all'
                      color='status-error'
                      size='large'
                    >
                      This name is already used for another broker.
                    </Text>
                  </Box>
                )}
                {emptyValueError && (
                  <Box>
                    <Text
                      wordBreak='break-all'
                      color='status-error'
                      size='large'
                    >
                      All fields must be filled.
                    </Text>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Layer>
    );
  }
}

export default RegisterForm;
