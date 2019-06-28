import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Form, Grommet, Heading, Menu, Text } from 'grommet';
import { LinkPrevious, Hpe, Add, Info } from 'grommet-icons';
import { hpe } from 'grommet-theme-hpe';
import './App.css';


//========================================= App
export default class App extends Component {
  render() {
    return (
      <Grommet theme={hpe} full>
        <Box fill>
          <AppBar text='Heading here' />
          <Box 
            className='main-content' 
            flex background={{color: 'light-1'}}
            pad={{horizontal: 'large', vertical: 'medium'}}  
          >
            content here
          </Box>
          <Footer />
        </Box>
      </Grommet>
    );
  };
};

//========================================= AppBar
class AppBar extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };

  render() {
    return (
      <Box
        tag='header'
        direction='column'
        align='start'
        justify='center'
        height='xmall'
        pad={{left: 'small', top: 'small'}}
        flex='false'
      >
        <Button 
          plain 
          color='brand' 
          label='Catalog' 
          gap='xsmall'
          icon={<LinkPrevious size='medium' color='brand' />} 
        />
        <LogoAndTitle text={this.props.text} />
      </Box>
    );
  };
};

//========================================= Logo and Title
class LogoAndTitle extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };

  render() {
    return (
      <Box margin={{vertical: 'small', horizontal: 'medium'}}>
        <Box >
          <Hpe color='brand' size='large' margi={{vertical: 'large'}} />
        </Box>
        <Box margin={{top: '-10px'}}>
          <Heading color='black' size='medium' margin={{vertical: 'none'}}>
            {this.props.text}
          </Heading>
        </Box>
      </Box>
    );
  };
};

//========================================= Footer
const Footer = () => (
  <Box 
    fill='horizontal' 
    background={{color: 'neutral-1'}} 
    height='xsmall' 
    direction='row'
    align='center'
    gap='large'
    pad={{horizontal: 'large'}}
  >
    <Hpe color='brand' size='medium' />
    <Text color='brand' >Hewlitt-Packard Enterprise</Text>
  </Box>
);


export {AppBar}; export {LogoAndTitle}; export {Footer};