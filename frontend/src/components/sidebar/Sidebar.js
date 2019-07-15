import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Text } from "grommet";
import { User } from "grommet-icons";


//========================================= Side Bar
const Sidebar = () => (
  <Box 
    background={{ color: 'dark-1' }}
    border={{ color: 'white', side: 'left' }}
    pad='medium'
    fill='vertical'
    width='20rem'
    gap='large'
    align='start'
    style={{position: 'fixed'}}
  >
    <Box className='user-icon-and-name'>
      <Box align='start' fill='horizontal' margin={{ left: '-12px' }}>
        <Link to='/settings' style={{ color:'white', textDecoration: 'none' }}>
          <Button icon={<User size='3rem' />} />
        </Link>
      </Box>
      <Box>
        <Link to='/settings' style={{ color:'white', textDecoration: 'none' }}>
          <Text size='xlarge' truncate>User Name</Text>
        </Link>
      </Box>
    </Box>
    <Box>
      <Link to='/catalog' style={{ color:'white' }}>
        <Text size='xlarge'>Catalog</Text>
      </Link>
    </Box>
    <Box>
      <Link to='/deployed' style={{ color:'white' }}>
        <Text size='xlarge'>Deployed Services</Text>
      </Link>
    </Box>
    <Box>
      <Link to='/settings' style={{ color:'white' }}>
        <Text size='xlarge'>Settings</Text>
      </Link>
    </Box>
    <Box>
      <Link to='/help' style={{ color:'white' }}>
        <Text size='xlarge'>Help</Text>
      </Link>
    </Box>
    <Box>
      <Link to='/' style={{ color:'white' }}>
        <Text size='xlarge'>Logout</Text>
      </Link>
    </Box>
  </Box>
)

export default Sidebar;
