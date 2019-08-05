import React, { Component } from 'react';
import { Box, Grid, Button, Text } from 'grommet';
import { Add } from 'grommet-icons';
import BrokerCard from '../broker-card/BrokerCard';
import BrokerDetail from '../broker-detail/BrokerDetail';
import RegisterForm from './RegisterForm';

//========================================= Settings
class Settings extends Component {
  state = {
    broker: {},
    detailsOpen: false,
    registerFormOpen: false,
    borderColor: 'light-5'
  };

  setBorder = color => {
    this.setState({ borderColor: color });
  };

  toggleDetails = broker => {
    this.setState({ detailsOpen: !this.state.detailsOpen, broker: broker });
  };

  toggleRegisterForm = () => {
    this.setState({ registerFormOpen: !this.state.registerFormOpen });
  };

  render() {
    const { broker, detailsOpen, registerFormOpen } = this.state;
    const { brokers, updateBrokers, updateServices } = this.props;

    return (
      <Box pad='large' fill>
        <Grid gap='large' columns='small' rows='small'>
          {brokers.map(broker => (
            <BrokerCard
              broker={broker}
              toggleDetails={this.toggleDetails}
              key={broker.name}
            />
          ))}
          <Box
            elevation='medium'
            background={{ color: 'white' }}
            border={{ color: this.state.borderColor }}
            round='xsmall'
            width='small'
            height='small'
            onClick={this.toggleRegisterForm}
            onMouseOver={() => this.setBorder('accent-1')}
            onMouseOut={() => this.setBorder('light-5')}
            style={{ cursor: 'pointer' }}
          >
            <Box
              height='40%'
              fill='horizontal'
              pad='medium'
              align='center'
              margin={{ bottom: 'small' }}
            >
              <Text size='38px' color='brand' textAlign='center'>
                Register a broker
              </Text>
            </Box>
            <Box
              flex
              fill='horizontal'
              pad='medium'
              align='center'
              justify='start'
            >
              <Button icon={<Add size='medium' color='brand' />} />
            </Box>
          </Box>
        </Grid>
        {detailsOpen && (
          <BrokerDetail
            toggleDetails={this.toggleDetails}
            broker={broker}
            brokers={brokers}
            updateBrokers={updateBrokers}
            updateServices={updateServices}
          />
        )}
        {registerFormOpen && (
          <RegisterForm
            brokers={brokers}
            toggleRegisterForm={this.toggleRegisterForm}
            updateBrokers={updateBrokers}
            updateServices={updateServices}
          />
        )}
      </Box>
    );
  }
}

export default Settings;
