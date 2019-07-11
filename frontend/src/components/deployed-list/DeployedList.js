import React from 'react';
import { Box, Button, Heading, Layer, Text } from 'grommet';
import { FormClose, Subtract } from 'grommet-icons';


//========================================= Deployed List
const DeployedList = (props) => (
  <Layer 
    full
    plain
    onEsc={props.toggle}
  >
    <Box 
      fill 
      background={{ color: 'light-2', opacity: 'strong' }} 
      pad='medium' 
      width='xlarge'
      align='center'  
    >
      <Box 
        background={{ color: 'white' }} 
        height='100%' 
        width='90%'
        pad='small'
      >
        <Box justify='center' direction='row' className='undeploy-list-header'>
          <Box flex align='center'>
            { props.fromCardButton && 
                <Heading color='brand'>Undeploy</Heading>
            }
            { !props.fromCardButton && 
                <Heading color='brand'>Your Instances</Heading>
            }
          </Box>
          <Box justifySelf='end' align='start' width='80px'>
            <Button icon={<FormClose size='large' />} onClick={props.toggle} />
          </Box>
        </Box>
        <Box className='undeploy-list-content' pad='medium'>
          { props.fromCardButton && 
              <Heading level='3' color='brand' alignSelf='center'>
                Choose an instance to undeploy.
              </Heading>
          }
          <Box direction='row'>
            <Box flex>
              <Text>instance A</Text>
            </Box>
            <Box width='small'>
              <Button label='Undeploy' icon={<Subtract />} onClick={props.toggle} round='small' />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  </Layer>
)

export default DeployedList;