import React, { Component } from 'react';
import { Box, Button, Layer, Heading, Text } from 'grommet';
import { FormClose, Edit, Subtract, Update } from 'grommet-icons';
import RegisterForm from '../register/RegisterForm';
import axios from 'axios';

//========================================= Broker Details
class BrokerDetail extends Component {
  state = {
    editing: false
  };

  submitEdit = ({ name, description, status, time, url, username }) => {
    const updatedBroker = {
      name,
      description,
      status,
      time,
      url,
      inputs: [{ username }]
    };

    this.props.updateBrokers('edit', this.props.broker, updatedBroker);
    this.props.toggleDetails();
  };

  handleDelete = confirmed => {
    if (confirmed) {
      const {
        updateBrokers,
        broker,
        updateServices,
        toggleDetails
      } = this.props;
      updateBrokers('delete', broker);
      updateServices([], broker.url);
      toggleDetails();
    }
  };

  handleUpdate = () => {
    const { broker, toggleDetails, updateBrokers, updateServices } = this.props;
    let updatedBroker = { ...broker };
    axios
      .get(`${broker.url}/v2/catalog`, {
        headers: {
          'X-Broker-API-Version': 2.14
        }
      })
      .then(results => {
        updatedBroker.status = 'loaded';
        updateServices(results.data.services, broker.url);
      })
      .catch(error => {
        console.log('error', error);
        alert('Failed to fetch catalog');
        updatedBroker.status = 'failed';
      })
      .then(() => {
        updateBrokers('edit', broker, updatedBroker);
        toggleDetails();
      });
  };

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  };

  render() {
    const { editing } = this.state;
    const { broker, brokers, toggleDetails } = this.props;
    const { name, status, description, time, url } = broker;

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
                      {name}
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
                  {description && (
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
                            {description}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  )}
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
                        {status}
                      </Text>
                    </Box>
                  </Box>
                  <Box>
                    <Heading level='3'>
                      <strong>URL</strong>
                    </Heading>
                  </Box>
                  <Box background={{ color: 'accent-1' }} height='2px' />
                  <Box direction='row' margin={{ top: 'small' }}>
                    <Box flex justify='start'>
                      <Text size='large'>Broker address:</Text>
                    </Box>
                    <Box flex justify='start' align='start'>
                      <Text size='large' wordBreak='break-all'>
                        {url}
                      </Text>
                    </Box>
                  </Box>
                  <Box>
                    <Box>
                      <Heading level='3'>
                        <strong>Time Created</strong>
                      </Heading>
                    </Box>
                    <Box background={{ color: 'accent-1' }} height='2px' />
                    <Box direction='row' margin={{ top: 'small' }}>
                      <Box flex justify='start'>
                        <Text size='large'>Time and Date: </Text>
                      </Box>
                      <Box flex justify='start' align='start'>
                        <Text size='large' wordBreak='break-all'>
                          {time}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box margin='small' align='center' flex={false}>
                  <Button
                    label='Edit'
                    icon={<Edit />}
                    onClick={() => this.toggleEdit()}
                  />
                  <Button
                    label='Update'
                    margin='medium'
                    icon={<Update />}
                    onClick={() => this.handleUpdate()}
                  />
                  <Button
                    label='Delete'
                    icon={<Subtract />}
                    onClick={() =>
                      this.handleDelete(
                        window.confirm(
                          `Are you sure you want to delete ${
                            this.props.broker.name
                          } ?`
                        )
                      )
                    }
                  />
                </Box>
              </Box>
            </Box>
          </Layer>
        )}

        {editing && (
          <RegisterForm
            editing={true}
            broker={broker}
            brokers={brokers}
            toggleDetails={toggleDetails}
            toggleEdit={this.toggleEdit}
            submitEdit={this.submitEdit}
          />
        )}
      </Box>
    );
  }
}

export default BrokerDetail;
