import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Button, Grid, Layer, Heading, Text } from 'grommet';
import { FormClose } from 'grommet-icons';
import Card from '../card/Card';
import axios from 'axios';
  
  
const DeployedDetail = (props) => {
  const { instance, toggleDetails } = props;
  console.log('instance', instance)

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
            overflow={{ vertical: 'scroll' }}
          >
            <Box justify='center' direction='row' className='deploy-detail-header'>
              <Box justifySelf='start' justify='center' width='80px'>
                <Button icon={<FormClose size='large' />} onClick={toggleDetails} />
              </Box>
              <Box flex align='center'>
                <Heading level='2' color='brand'>{instance.name}</Heading>
              </Box>
            </Box>
            <Box flex align='center'>
              <Text size='large' color='white'>{instance.description}</Text>
            </Box>
            <Box className='details-content'>
              {/* { instance.map(detail => {
                const detailName = detail[Object.keys(detail)[0]];
                const detailValue = detail[detailName];
                return (
                  <Box direction='row'>
                    <Box flex align='start'>
                      {detailName}:
                    </Box>
                    <Box flex align='end'>
                      {detailValue}
                    </Box>
                  </Box>
                )}
              )} */}
            </Box>
        </Box>
      </Box>
    </Layer>
  )
}

export default DeployedDetail;