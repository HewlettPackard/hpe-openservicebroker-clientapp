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
    clicked: false,
    service: this.props.service
  };

  // setBorder = () => {
  //   if (!this.state.hovering)
  //     this.setState({ borderColor: 'accent-1', hovering: true })
  //   else 
  //     this.setState({ borderColor: 'light-5', hovering: false })
  // }


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
    const { borderColor, service, clicked } = this.state;
    const { fromDeployed, toggleDetails } = this.props;

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
        onClick={toggleDetails}
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