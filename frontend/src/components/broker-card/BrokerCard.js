import React, { Component } from 'react';
import { Box, Button, Text } from 'grommet';
import { More } from 'grommet-icons';

//========================================= Broker Card
class BrokerCard extends Component {
  state = {
    borderColor: 'light-5'
  };

  setBorder = color => {
    this.setState({ borderColor: color });
  };

  render() {
    const { borderColor } = this.state;
    const { broker, toggleDetails } = this.props;
    return (
      <Box
        elevation='medium'
        background={{ color: 'white' }}
        border={{ color: borderColor }}
        width='small'
        height='small'
        onMouseOver={() => this.setBorder('accent-1')}
        onMouseOut={() => this.setBorder('light-5')}
        onClick={() => toggleDetails(broker)}
        style={{ cursor: 'pointer' }}
      >
        <Box
          flex
          fill='horizontal'
          pad={{ top: 'medium', horizontal: 'small' }}
        >
          <Text size='2em' color='brand' truncate textAlign='center'>
            {broker.name}
          </Text>
        </Box>
        <Box
          fill='horizontal'
          justify='start'
          height='xsmall'
          overflow={{ horizontal: 'auto' }}
        >
          <Text size='large' textAlign='center'>
            {broker.description}
          </Text>
        </Box>
        <Box fill='horizontal'>
          <Button
            label='Details'
            icon={<More />}
            plain
            primary
            color='light-3'
          />
        </Box>
      </Box>
    );
  }
}

export default BrokerCard;
