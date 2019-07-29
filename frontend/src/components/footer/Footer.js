import React from 'react';
import { Box, Text } from 'grommet';
import { Hpe } from 'grommet-icons';

//========================================= Footer
const Footer = () => (
  <Box gap='large' pad='small'>
    <Box direction='row' gap='small'>
      <Hpe color='brand' size='medium' />
      <Text size='small' color='brand'>
        Hewlett Packard Enterprise
      </Text>
    </Box>
  </Box>
);

export default Footer;
