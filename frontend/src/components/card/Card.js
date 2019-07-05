import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text } from 'grommet';


//========================================= Card
class Card extends Component {
  // static propTypes = {
  //   text: PropTypes.string.isRequired
  // };

  state = {
    borderColor: 'light-5',
    hovering: false,
    service: this.props.service
  };

  setBorder = () => {
    if (!this.state.hovering)
      this.setState({ borderColor: 'accent-1', hovering: true })
    else 
      this.setState({ borderColor: 'light-5', hovering: false })
    
  }

  render() {
    const { borderColor, service } = this.state;

    return (
      <Link to={`/deploy/${service.name}`} style={{ textDecoration: 'none' }}>
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
          <Box flex fill='horizontal' pad={{ left: 'medium' }}>
            <Heading level='2' color='brand' size='medium' truncate>
              {service.name}
            </Heading>
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
      </Link>
    );
  }
};

export default Card;