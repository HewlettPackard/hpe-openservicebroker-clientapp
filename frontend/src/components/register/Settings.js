import React, { Component } from 'react';
import { Box, Grid, Button, Text } from 'grommet';
import { Add } from 'grommet-icons';
import axios from 'axios';
import BrokerCard from '../broker-card/BrokerCard';
import BrokerDetail from '../broker-detail/BrokerDetail';
import RegisterForm from './RegisterForm';
import config from '../../config';

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

  //update the list of brokers by calling the API
  // componentDidMount() {
  // 	axios
  // 		.get(`${config.apiUrl}/catalog`, {
  // 			headers: {
  // 				"X-Broker-API-Version": 2.14
  // 			}
  // 		})
  // 		.then(results => {
  // 			this.setState({
  // 				brokerList: [...results.data.services]
  // 			});
  // 		})
  // 		.catch(error => {
  // 			console.log(error);
  // 		});
  // }

  toggleDetails = broker => {
    this.setState({ detailsOpen: !this.state.detailsOpen, broker: broker });
  };

  toggleRegisterForm = () => {
    this.setState({ registerFormOpen: !this.state.registerFormOpen });
  };

  render() {
    const { broker, detailsOpen, registerFormOpen } = this.state;
    const { brokers, updateBrokers } = this.props;

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
            updateBrokers={updateBrokers}
          />
        )}
        {registerFormOpen && (
          <RegisterForm
            toggleRegisterForm={this.toggleRegisterForm}
            updateBrokers={updateBrokers}
          />
        )}
      </Box>
    );
  }
}

export default Settings;
