import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Button, Grid, Layer, Heading, Text } from 'grommet';
import { FormClose, Subtract } from 'grommet-icons';
import Card from '../card/Card';
import axios from 'axios';
  
  
const DeployedDetail = (props) => {
  const { instance, toggleDetails } = props;

  const handleDelete = () => {
    ///API stuff
    props.toggleDetails();
  }  

  return (
    <Layer full plain onEsc={toggleDetails} animate={false}>
      <Box direction='row' fill>
        <Box flex background={{ color: 'black', opacity: 'medium' }} />
        <Box 
          background={{ color: 'dark-1' }} 
          overflow={{ vertical: 'scroll' }}
          width='large'
          pad='small'
        >
          <Box className='deploy-detail-header' direction='row' flex={false}>
            <Box justify='center' flex>
              <Button icon={<FormClose size='large' color='accent-1' />} onClick={toggleDetails} />
            </Box>
            <Box align='center' flex>
              <Heading level='2'>{instance.name}</Heading>
            </Box>
            <Box flex /> {/*empty box to center heading*/}
          </Box>
          <Box align='center' flex={false}>
            <Text size='large' color='white'>{instance.description}</Text>
          </Box>
          <Box className='details-content' flex={false} margin={{ top: 'medium' }}>
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
          <Box width='medium' align='center' alignSelf='center' margin='medium' flex={false}>
            <Button label='Delete' icon={<Subtract />} onClick={() => handleDelete()}/>
          </Box>
        </Box>
      </Box>
    </Layer>
  )
}

export default DeployedDetail;