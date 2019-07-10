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
    deployed: true,
    service: this.props.service,
    showing: false
  };

  setBorder = () => {
    if (!this.state.hovering)
      this.setState({ borderColor: 'accent-1', hovering: true })
    else 
      this.setState({ borderColor: 'light-5', hovering: false })
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  updateDeployed = () => {
    this.setState({ deployed: true })
  }

  toggle = () => {
    this.setState({ showing: !this.state.showing, hovering: false });
  }


  render() {
    const { borderColor, service, clicked, deployed, showing } = this.state;
    if (clicked)
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
    else if (!deployed) return (
      <Box 
        elevation='medium' 
        background={{ color: 'white' }}
        border={{ color: borderColor }}
        round='xsmall'
        justify='start'
        align='center'
        width='small'
        height='small'
        onMouseOver={this.setBorder}
        onMouseOut={this.setBorder}
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
    else if (deployed) return (
      <Box 
        elevation='medium' 
        background={{ color: 'white' }}
        border={{ color: borderColor }}
        round='xsmall'
        justify='start'
        align='center'
        width='small'
        height='small'
        onMouseOver={this.setBorder}
        onMouseOut={this.setBorder}
      >
        <Box onClick={this.handleClick} flex>
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
          >  
            <Text size='large'>
              {service.description}
            </Text>
          </Box>
        </Box>
        <Box fill='horizontal'>
          <Button label='Undeploy' icon={<Subtract />} plain primary onClick={this.toggle} color='light-3' />
        </Box>
        { showing && 
            <DeployedList toggle={this.toggle} />
        }
      </Box>
    )
  }
};

export default Card;