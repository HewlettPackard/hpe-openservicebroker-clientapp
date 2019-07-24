import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Text, Heading } from "grommet";
import { Cloud, User } from "grommet-icons";
import Footer from '../footer/Footer';

//========================================= Side Bar
const Sidebar = (props) => (
  <Box
    background={{ color: 'dark-1' }}
    border={{ color: 'white', side: 'left' }}
    fill='vertical'
    align='start'
    style={{ position: 'fixed', boxShadow: '2px 0 8px grey' }}
  >
    <Box pad="medium" gap='small'>
      <Box gap="small" direction="row">
        <Cloud size="large" />
        <Heading margin="none">
          OSBG
        </Heading>
      </Box>
      <Box>
        <Link to='/catalog' style={{ color: 'white', textDecoration: 'none' }}>
          <Text size='xlarge'>Catalog</Text>
        </Link>
      </Box>
      <Box>
        <Link to='/deployed' style={{ color: 'white', textDecoration: 'none' }}>
          <Text size='xlarge'>Deployed Services</Text>
        </Link>
      </Box>
      <Box>
        <Link to='/settings' style={{ color: 'white', textDecoration: 'none' }}>
          <Text size='xlarge'>Settings</Text>
        </Link>
      </Box>
      <Box>
        <Link to='/help' style={{ color: 'white', textDecoration: 'none' }}>
          <Text size='xlarge'>Help</Text>
        </Link>
      </Box>
      <Box>
        <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
          <Text size='xlarge'>Logout</Text>
        </Link>
      </Box>
    </Box>
    <Box flex justify="end" align="start">
      <Box pad={{ horizontal: 'small' }} className='user-icon-and-name' gap="xsmall">
        <Box align='start'>
          <Link to='/settings' style={{ color: 'white', textDecoration: 'none' }}>
            <Box background="accent-2" round="full" pad="xsmall">
              <Button icon={<User size='3rem' />} />
            </Box>
          </Link>
        </Box>
        <Box>
          <Link to='/settings' style={{ color: 'white', textDecoration: 'none' }}>
            <Text size='medium' truncate>Test@example.com{props.username}</Text>
          </Link>
        </Box>
      </Box>
      <Footer />
    </Box>
  </Box>
)

export default Sidebar;
