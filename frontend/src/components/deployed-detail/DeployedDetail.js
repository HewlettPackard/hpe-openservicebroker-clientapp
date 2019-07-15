import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Button, Grid, Layer, Heading, Text } from 'grommet';
import { FormClose } from 'grommet-icons';
import Card from '../card/Card';
import axios from 'axios';
  
  
const DeployedDetail = (props) => {
  const { toggleDetails } = props;

  return (
    <Layer 
      full
      plain
      onEsc={toggleDetails}
      animate={false}
    >
      <Box direction='row' fill>
        <Box 
          flex background={{ color: 'light-5', opacity: 'medium' }} />
          <Box 
            background={{ color: 'dark-1' }} 
            height='100%' 
            width='large'
            pad='small'
          >
            <Box justify='center' direction='row' className='deploy-detail-header'>
              <Box justifySelf='start' justify='center' width='80px'>
                <Button icon={<FormClose size='large' />} onClick={toggleDetails} />
              </Box>
              <Box flex align='center'>
                <Heading level='2' color='brand'>instance name</Heading>
              </Box>
            </Box>
            <Box className='details-content'>

            </Box>
        </Box>
      </Box>
    </Layer>
  )
}

export default DeployedDetail;