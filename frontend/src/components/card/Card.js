import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text } from 'grommet';


//========================================= Card
class Card extends Component {
  // static propTypes = {
  //   text: PropTypes.string.isRequired
  // };

  state = {
    service: this.props.service
  };

  render() {
    const { service } = this.state;
    const plans = [];

    service.plans.forEach(plan => 
      plans.push(plan)
    );

    return (
      <Link to='/deploy' style={{ textDecoration: 'none' }}>
        <Box 
          elevation='medium' 
          background={{ color: 'white' }}
          border={{ color: 'light-5' }}
          round='xsmall'
          justify='start'
          align='center'
          width='small'
          height='small'
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