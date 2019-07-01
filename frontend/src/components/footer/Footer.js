import React from "react";
import { Box, Text } from "grommet";
import { Hpe } from "grommet-icons";


c//========================================= Footer
const Footer = () => (
  <Box 
    fill='horizontal' 
    background={{color: 'neutral-1'}} 
    height='xsmall' 
    direction='row'
    align='center'
    gap='large'
    pad={{horizontal: 'large'}}
    flex='false'
  >
    <Box direction='row' gap='xsmall'>
      <Hpe color='brand' size='medium' />
      <Text color='brand' >Hewlett-Packard Enterprise</Text>
    </Box>
  </Box>
);

export default Footer;
