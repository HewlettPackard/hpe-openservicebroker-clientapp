import React, { Component } from 'react';
import { Box, Button, Layer, Heading, Text } from 'grommet';
import { FormClose, Edit, Subtract } from 'grommet-icons';
import RegisterForm from '../register/RegisterForm';
import axios from 'axios';

//========================================= Broker Details
class BrokerDetail extends Component {
  state = {
    editing: false
  };

  submitEdit = ({ name, url, uname, pwd }) => {
    const updatedBroker = {
      name,
      inputs: [{ url }, { uname }, { pwd }]
    };

    this.props.updateBrokers('edit', this.props.broker, updatedBroker);
    this.props.toggleDetails();
  };

  handleDelete = confirmed => {
    if (confirmed) {
      this.props.updateBrokers('delete', this.props.broker);
      this.props.toggleDetails();
    }
  };

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  };

  render() {
    const { editing } = this.state;
    const { broker, brokers, toggleDetails } = this.props;
    const name = broker.name;
    const status = broker.status;
    const description = broker.description;

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
                <Box margin='small' align='center' flex={false}>
                  <Button
                    label='Edit'
                    margin='medium'
                    icon={<Edit />}
                    onClick={() => this.toggleEdit()}
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
