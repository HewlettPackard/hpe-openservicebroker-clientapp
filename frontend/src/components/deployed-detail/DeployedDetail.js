import React from 'react';
import { Box, Button, Layer, Heading, Text } from 'grommet';
import { FormClose, Subtract } from 'grommet-icons';
import axios from 'axios';
  
  
const DeployedDetail = (props) => {
  const { instance, toggleDetails, updateInstances } = props;

  const handleDelete = () => {
    ///API stuff
    toggleDetails();
    updateInstances('delete',instance);
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
          <Box className='deployed-details-content' width='large' pad='medium' flex={false}>
            <Box className='deployed-description-box'>
              <Box>
                <Heading level='3'><strong>Description</strong></Heading>
              </Box>
              <Box background={{ color: 'accent-1' }} height='2px' />
              <Box direction='row' align='start' height='xxsmall' justify='center'>
                <Box flex justify='center' fill='vertical'>
                  <Text size='large'>Description: </Text>
                </Box>
                <Box flex justify='center' align='start' fill='vertical'>
                  <Text size='large'>{instance.description}</Text>
                </Box>
              </Box>
            </Box> 
            <Box className='deployed-parameters-box'>
              {/* { instance.paramters.map(detail => {
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
          <Box width='medium' align='center' alignSelf='center' margin='medium' flex={false}>
            <Button label='Delete' icon={<Subtract />} onClick={() => handleDelete(instance)}/>
          </Box>
        </Box>
      </Box>
    </Layer>
  )
}

export default DeployedDetail;