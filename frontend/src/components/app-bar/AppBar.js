import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Menu } from 'grommet';
import { Add, LinkPrevious, Sync, User } from 'grommet-icons';
import LogoAndTitle from '../logo-title/LogoTitle';


//========================================= AppBar
const AppBar = (props) => (
  <Box 
    fill='horizontal' 
    height='5rem' 
    border={{ color: 'light-5', side: 'bottom', size: 'small' }}
    pad='small'
    margin={{ left: 'small' }}
  >
    <LogoAndTitle text={props.text} />
  </Box>
)

export default AppBar;
