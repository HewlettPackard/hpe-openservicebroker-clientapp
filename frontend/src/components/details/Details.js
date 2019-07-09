import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionPanel, Box, Button, Heading, Layer, Text } from "grommet";
import { FormClose, Services } from "grommet-icons";
import { Login } from 'grommet-icons';


//========================================= Login Form
const Details = (props) => {
  const { toggle } = props;
  const services = []; //from back end

  return (
    <Layer 
      full
      plain
      onEsc={() => this.toggleDetailsLayer()}
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
          <Box justify='center' direction='row' className='detail-header'>
            <Box flex align='center'>
              <Heading color='brand'>Details</Heading>
            </Box>
            <Box justifySelf='end' align='start' width='80px'>
              <Button icon={<FormClose size='large' />} onClick={toggle} />
            </Box>
          </Box>
          <Box className='details-content'>
            <Accordion>
              {services.length > 0 && services.map(service => (
                <AccordionPanel label={service.name}>
                  <Box>
                    <Heading level='4'>{service.description}</Heading>
                  </Box>
                  <Box>

                  </Box>
                </AccordionPanel>
              ))}

            </Accordion>
          </Box>
        </Box>
      </Box>
    </Layer>
  )
}

export default Details;