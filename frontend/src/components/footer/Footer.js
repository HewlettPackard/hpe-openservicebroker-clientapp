import React from "react";
import { Box, Text } from "grommet";
import { Hpe } from "grommet-icons";


//========================================= Footer
const Footer = () => (
  <Box 
    fill='horizontal' 
    background={{ color: 'neutral-1' }} 
    height='50px' 
    direction='row'
    align='center'
    gap='large'
    pad={{ horizontal: 'large' }}
  >
    <Box direction='row' gap='small' align='center'>
      <Hpe color='brand' size='medium' />
      <Text size='large' color='brand' >Hewlett Packard Enterprise</Text>
    </Box>
  </Box>
)

export default Footer;
