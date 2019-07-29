import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Text, Heading } from 'grommet';
import { Cloud, User } from 'grommet-icons';
import Footer from '../footer/Footer';

//========================================= Side Bar
const Sidebar = props => (
  <Box
    background={{ color: 'dark-1' }}
    border={{ color: 'white', side: 'left' }}
    fill='vertical'
    align='start'
    style={{ position: 'fixed', boxShadow: '2px 0 8px grey' }}
  >
    <Box pad='medium' gap='small'>
      <Box gap='small' direction='row'>
        <Cloud size='large' />
        <Heading margin='none'>OSBG</Heading>
      </Box>
      <Box>
        <Link
          to='/catalog'
          onClick={() => props.setActivePath('/catalog')}
          style={{ color: 'white', textDecoration: 'none' }}
        >
          {props.activePath === '/catalog' ? (
            <Text size='xlarge' color='accent-1'>
              Catalog
            </Text>
          ) : (
            <Text size='xlarge'>Catalog</Text>
          )}
        </Link>
      </Box>
      <Box>
        <Link
          to='/deployed'
          onClick={() => props.setActivePath('/deployed')}
          style={{ color: 'white', textDecoration: 'none' }}
        >
          {props.activePath === '/deployed' ? (
            <Text size='xlarge' color='accent-1'>
              Deployed Services
            </Text>
          ) : (
            <Text size='xlarge'>Deployed Services</Text>
          )}
        </Link>
      </Box>
      <Box>
        <Link
          to='/settings'
          onClick={() => props.setActivePath('/settings')}
          style={{ color: 'white', textDecoration: 'none' }}
        >
          {props.activePath === '/settings' ? (
            <Text size='xlarge' color='accent-1'>
              Broker Settings
            </Text>
          ) : (
            <Text size='xlarge'>Broker Settings</Text>
          )}
        </Link>
      </Box>
      <Box>
        <Link
          to='/help'
          onClick={() => props.setActivePath('/help')}
          style={{ color: 'white', textDecoration: 'none' }}
        >
          {props.activePath === '/help' ? (
            <Text size='xlarge' color='accent-1'>
              Help
            </Text>
          ) : (
            <Text size='xlarge'>Help</Text>
          )}
        </Link>
      </Box>
      <Box>
        <Link
          to='/'
          style={{ color: 'white', textDecoration: 'none' }}
          onClick={() => props.setActivePath('/catalog')}
        >
          <Text size='xlarge'>Logout</Text>
        </Link>
      </Box>
    </Box>
    <Box flex justify='end' align='start'>
      <Box
        pad={{ horizontal: 'small' }}
        className='user-icon-and-name'
        gap='xsmall'
      >
        <Box align='start'>
          <Link
            to='/settings'
            style={{ color: 'white', textDecoration: 'none' }}
          >
            <Box background='accent-2' round='full' pad='xsmall'>
              <Button icon={<User size='3rem' />} />
            </Box>
          </Link>
        </Box>
        <Box>
          <Link
            to='/settings'
            style={{ color: 'white', textDecoration: 'none' }}
          >
            <Text size='medium' truncate>
              {props.username}
            </Text>
          </Link>
        </Box>
      </Box>
      <Footer />
    </Box>
  </Box>
);

export default Sidebar;
