import React from 'react';
import { Box, Heading } from 'grommet';

//========================================= Logo and Title
const LogoAndTitle = props => (
  <Box direction='row'>
    <Heading level='1' margin={{ vertical: 'none' }} color='brand'>
      {props.text}
    </Heading>
  </Box>
);

export default LogoAndTitle;
