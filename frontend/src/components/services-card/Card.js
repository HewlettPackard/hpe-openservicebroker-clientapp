import React, { Component } from 'react';
import { Box, Button, Text } from 'grommet';
import { Add, More } from 'grommet-icons';

//========================================= Card
class Card extends Component {
  state = {
    borderColor: 'light-5'
  };

  setBorder = color => {
    this.setState({ borderColor: color });
  };

  render() {
    const { borderColor } = this.state;
    const {
      fromDeployed,
      instance,
      service,
      toggleDeploy,
      toggleDetails
    } = this.props;

    if (!fromDeployed)
      return (
        <Box
          elevation='medium'
          background={{ color: 'white' }}
          border={{ color: borderColor }}
          width='small'
          height='small'
          onMouseOver={() => this.setBorder('accent-1')}
          onMouseOut={() => this.setBorder('light-5')}
          onClick={() => toggleDeploy(service)}
          style={{ cursor: 'pointer' }}
        >
          <Box
            flex
            fill='horizontal'
            pad={{ top: 'medium', horizontal: 'small' }}
          >
            <Text size='2em' color='brand' truncate textAlign='center'>
              {service.name}
            </Text>
          </Box>
          <Box
            flex
            fill='horizontal'
            overflow={{ horizontal: 'auto' }}
            justify='start'
            height='xsmall'
          >
            <Text size='large' textAlign='center'>
              {service.description}
            </Text>
          </Box>
          <Box fill='horizontal'>
            <Button
              label='Deploy'
              icon={<Add />}
              plain
              primary
              color='light-3'
            />
          </Box>
        </Box>
      );
    else if (fromDeployed)
      return (
        <Box
          elevation='medium'
          background={{ color: 'white' }}
          border={{ color: borderColor }}
          width='small'
          height='small'
          onMouseOver={() => this.setBorder('accent-1')}
          onMouseOut={() => this.setBorder('light-5')}
          onClick={() => toggleDetails(instance)}
          style={{ cursor: 'pointer' }}
        >
          <Box
            flex
            fill='horizontal'
            pad={{ top: 'medium', horizontal: 'small' }}
          >
            <Text size='2em' color='brand' truncate textAlign='center'>
              {instance.name}
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

export default Card;
