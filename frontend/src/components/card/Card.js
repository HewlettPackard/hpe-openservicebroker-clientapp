import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Box, Button, Heading, Layer, Text } from 'grommet';
import { FormClose, Subtract } from 'grommet-icons';


//========================================= Card
class Card extends Component {
  // static propTypes = {
  //   text: PropTypes.string.isRequired
  // };

  state = {
    borderColor: 'light-5',
    hovering: false, 
    clicked: false,
    // deployed: false,
    deployed: true,
    service: this.props.service
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

  
  render() {
    const { borderColor, service, clicked, deployed } = this.state;

    if (clicked)
      return (
        <Redirect 
          to={{
            pathname: '/deploy',
            state: { service: service }
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
          <Button label='Undeploy' icon={<Subtract />} plain primary onClick={toggle} color='light-3' />
        </Box>
        { showing && 
            <DeployList />
        }
      </Box>
    )
  }
};

export default Card;



let showing = false;

const toggle = () => {
  showing = !showing;
}

const DeployList = () => (
  <Layer 
    full
    plain
    onEsc={toggle}
  >
    <Box 
      fill 
      background={{ color: 'light-2', opacity: 'strong' }} 
      pad='medium' 
      width='xlarge'
      align='center'  
    >
      <Box 
        background={{ color: 'white' }} 
        height='100%' 
        width='90%'
        pad='small'
      >
        <Box justify='center' direction='row' className='undeploy-list-header'>
          <Box flex align='center'>
            <Heading color='brand'>Undeploy</Heading>
          </Box>
          <Box justifySelf='end' align='start' width='80px'>
            <Button icon={<FormClose size='large' />} onClick={toggle} />
          </Box>
        </Box>
        <Box className='undeploy-list-content' pad='medium'>
          <Heading level='3' color='brand' alignSelf='center'>
            Choose an instance to undeploy.
          </Heading>
          <Box direction='row'>
            <Box flex>
              <Text>instance A</Text>
            </Box>
            <Box width='small'>
              <Button label='Undeploy' icon={<Subtract />} onClick={toggle} round='small' />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  </Layer>
)