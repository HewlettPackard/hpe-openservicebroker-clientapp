import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Button, Text } from 'grommet';
import { Subtract } from 'grommet-icons';
import DeployedList from '../deployed-list/DeployedList'; 


//========================================= Card
class Card extends Component {
  // static propTypes = {
  //   text: PropTypes.string.isRequired
  // };

  state = {
    borderColor: 'light-5',
    hovering: false, 
    clicked: false
  };

  setBorder = (color) => {
      this.setState({ borderColor: color });
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  toggle = () => {
    this.setState({ hovering: false });
  }


  render() {
    const { borderColor, clicked } = this.state;
    const { fromDeployed, service, toggleDetails } = this.props;

    if (clicked && !fromDeployed)
      return (
        <Redirect 
          to={{
            pathname: '/deploy',
            state: { 
              service: service
            }
          }} 
        />
      )

    else if (!fromDeployed) return (
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
        onClick={this.handleClick}
      >
        <Box flex fill='horizontal' justify='center' align='center'>
          <Text size='38px' color='brand' truncate>
            {service.name}
          </Text>
        </Box>
        <Box 
          flex 
          fill='horizontal' 
          justify='start' 
          align='start' 
          overflow={{ horizontal: 'scroll' }}
          pad={{ left: 'medium' }}
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
          justify='start' 
          align='start' 
          overflow={{ horizontal: 'scroll' }}
          pad={{ left: 'medium' }}
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