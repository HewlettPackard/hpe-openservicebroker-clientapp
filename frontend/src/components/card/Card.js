import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Text } from 'grommet';
import { Subtract } from 'grommet-icons';
import DeployForm from '../forms/DeployForm'; 


//========================================= Card
class Card extends Component {
  state = {
    borderColor: 'light-5'
  };

  setBorder = (color) => {
      this.setState({ borderColor: color });
  }

  // handleClick = () => {
  //   this.setState({ clicked: !this.state.clicked })
  // }


  render() {
    const { borderColor, clicked } = this.state;
    const { fromDeployed, service, toggleDeploy, toggleDetails } = this.props;

    if (!fromDeployed) return (
      <Box 
        elevation='medium' 
        background={{ color: 'white' }}
        border={{ color: borderColor }}
        justify='start'
        align='center'
        width='small'
        height='small'
        onMouseOver={() => this.setBorder('accent-1')}
        onMouseOut={() => this.setBorder('light-5')}
        onClick={() => toggleDeploy(service)}
      >
        <Box flex fill='horizontal' justify='center' align='center'>
          <Text size='38px' color='brand' truncate>
            {service.name}
          </Text>
        </Box>
        <Box 
          flex 
          fill='horizontal'  
          pad={{ left: 'medium' }}
          overflow={{ vertical: 'scroll' }}
        >  
          <Text size='large'>
            {service.description}
          </Text>
        </Box>
      </Box>
    )
    else if (fromDeployed) return (
      <Box 
        elevation='medium' 
        background={{ color: 'white' }}
        border={{ color: borderColor }}
        justify='start'
        align='center'
        width='small'
        height='small'
        onMouseOver={() => this.setBorder('accent-1')}
        onMouseOut={() => this.setBorder('light-5')}
        onClick={() => toggleDetails(service)}
      >
        <Box flex fill='horizontal' justify='center' align='center'>
          <Text size='38px' color='brand' truncate>
            {service.name}
          </Text>
        </Box>
        <Box 
          flex 
          fill='horizontal' 
          pad={{ left: 'medium' }}
          overflow={{ vertical: 'scroll' }}
        >  
          <Text size='large'>
            {service.description}
          </Text>
        </Box>
      </Box>
    )
  }
};

export default Card;