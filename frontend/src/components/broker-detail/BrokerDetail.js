import React, { Component } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Layer,
  Heading,
  Text,
  TextInput
} from 'grommet';
import { Checkmark, Close, FormClose, Edit, Subtract } from 'grommet-icons';
import axios from 'axios';

//========================================= Broker Details
class BrokerDetail extends Component {
  state = {
    editing: false,
    name: this.props.broker.name,
    url: this.props.broker.inputs[0].url,
    uname: this.props.broker.inputs[1].uname,
    pwd: this.props.broker.inputs[2].pwd
  };

  handleDelete = () => {
    this.props.updateBrokers('delete', this.props.broker);
    this.props.toggleDetails();
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  };

  submitEdit = () => {
    const updatedBroker = {
      name: this.state.name,
      inputs: [
        { url: this.state.url },
        { uname: this.state.uname },
        { pwd: this.state.pwd }
      ]
    };

    this.props.updateBrokers('edit', this.props.broker, updatedBroker);
    this.props.toggleDetails();
  };

  render() {
    const { editing, name, url, uname, pwd } = this.state;
    const { broker, toggleDetails } = this.props;

    let statusColor = 'status-warning';
    if (broker.status === 'loaded') statusColor = 'status-ok';
    if (broker.status === 'failed') statusColor = 'status-error';

    return (
      <Box>
        {!editing && (
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
                <Box
                  className='deploy-detail-header'
                  direction='row'
                  flex={false}
                >
                  <Box justify='center' flex>
                    <Button
                      icon={<FormClose size='large' color='accent-1' />}
                      onClick={toggleDetails}
                    />
                  </Box>
                  <Box align='center' flex pad={{ top: 'small' }}>
                    <Text size='xxlarge' weight='bold' wordBreak='break-all'>
                      {broker.name}
                    </Text>
                  </Box>
                  <Box flex /> {/* empty box to center title */}
                </Box>
                <Box
                  className='deployed-details-content'
                  width='large'
                  pad='medium'
                  flex={false}
                >
                  <Box className='deployed-description-box'>
                    <Box>
                      <Heading level='3'>
                        <strong>Description</strong>
                      </Heading>
                    </Box>
                    <Box background={{ color: 'accent-1' }} height='2px' />
                    <Box direction='row' margin={{ top: 'small' }}>
                      <Box flex justify='start'>
                        <Text size='large'>Description: </Text>
                      </Box>
                      <Box flex justify='start' align='start'>
                        <Text size='large' wordBreak='break-all'>
                          {broker.description}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Heading level='3'>
                      <strong>Status</strong>
                    </Heading>
                  </Box>
                  <Box background={{ color: 'accent-1' }} height='2px' />
                  <Box direction='row' margin={{ top: 'small' }}>
                    <Box flex justify='start'>
                      <Text size='large'>Broker status:</Text>
                    </Box>
                    <Box flex justify='start' align='start'>
                      <Text
                        size='large'
                        wordBreak='break-all'
                        color={statusColor}
                      >
                        {broker.status}
                      </Text>
                    </Box>
                  </Box>
                  <Box className='broker-parameters-box'>
                    <Box>
                      <Heading level='3'>
                        <strong>Inputs</strong>
                      </Heading>
                    </Box>
                    <Box background={{ color: 'accent-1' }} height='2px' />
                    {broker.inputs.map(detail => {
                      const detailName = Object.keys(detail)[0];
                      const detailValue = detail[detailName];
                      return (
                        <Box
                          direction='row'
                          margin={{ top: 'small' }}
                          key={detailName}
                        >
                          <Box flex justify='start'>
                            <Text size='large'>{detailName}:</Text>
                          </Box>
                          <Box flex justify='start' align='start'>
                            <Text size='large' wordBreak='break-all'>
                              {detailValue}
                            </Text>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
                <Box
                  width='medium'
                  align='center'
                  alignSelf='center'
                  margin='medium'
                  flex={false}
                >
                  <Button
                    label='Edit'
                    icon={<Edit />}
                    onClick={() => this.toggleEdit()}
                  />
                </Box>
                <Box
                  width='medium'
                  align='center'
                  alignSelf='center'
                  margin='medium'
                  flex={false}
                >
                  <Button
                    label='Delete'
                    icon={<Subtract />}
                    onClick={() => this.handleDelete()}
                  />
                </Box>
              </Box>
            </Box>
          </Layer>
        )}

        {editing && (
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
                      Edit {broker.name}
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
                  <Form>
                    <FormField label='Broker name'>
                      <TextInput
                        id='name'
                        value={name}
                        onChange={this.handleChange}
                      />
                    </FormField>
                    <FormField label='URL'>
                      <TextInput
                        id='url'
                        value={url}
                        onChange={this.handleChange}
                      />
                    </FormField>
                    <FormField label='Username'>
                      <TextInput
                        id='uname'
                        value={uname}
                        onChange={this.handleChange}
                      />
                    </FormField>
                    <FormField label='Password'>
                      <TextInput
                        type='password'
                        id='pwd'
                        value={pwd}
                        onChange={this.handleChange}
                      />
                    </FormField>
                  </Form>
                </Box>
                <Box
                  width='medium'
                  align='center'
                  alignSelf='center'
                  margin='medium'
                  flex={false}
                >
                  <Button
                    label='Submit Changes'
                    icon={<Checkmark />}
                    onClick={() => this.submitEdit()}
                  />
                </Box>
                <Box
                  width='medium'
                  align='center'
                  alignSelf='center'
                  margin='medium'
                  flex={false}
                >
                  <Button
                    label='Cancel'
                    icon={<Close />}
                    onClick={() => this.toggleEdit()}
                  />
                </Box>
              </Box>
            </Box>
          </Layer>
        )}
      </Box>
    );
  }
}

export default BrokerDetail;
