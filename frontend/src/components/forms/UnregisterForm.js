import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Form, FormField, TextInput } from 'grommet';
import { Subtract } from 'grommet-icons';


//========================================= Login Form
const UnregisterForm = () => (
  <Box width='small' align='center' gap='medium' fill> 
    <Form>
      
    </Form>
    <Link to='/'>
      <Button
        color='brand'
        label='Unregister'
        gap='xsmall'
        icon={<Subtract size='medium' color='brand' />}
      />
    </Link>
  </Box>
)

export default UnregisterForm;