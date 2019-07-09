import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Menu } from 'grommet';
import { Add, LinkPrevious, Sync, User } from 'grommet-icons';
import LogoAndTitle from '../logo-title/LogoTitle';
import PropTypes from 'prop-types';


//========================================= AppBar
class AppBar extends Component {
	render() {
    const { text, update, username } = this.props;
    let back = <Box />;
    let buttons = <Box width='50%' />;
    let user = <Box />;

    switch (text) {
      case 'Login': 
        break;
      case 'Catalog':
        buttons =
          <Box
            direction='column'
            align='end'
            justify='center'
            width='50%'
            gap='medium'
            pad={{ right: '10%' }}
          >
            <Link to='/register'>
              <Button
                color='brand'
                label='Register Broker'
                gap='xsmall'
                icon={<Add size='medium' color='brand' />}
              />
            </Link>
            <Button
              color='brand'
              label='Update Catalog'
              gap='xsmall'
              icon={<Sync size='medium' color='brand' />}
              onClick={() => {alert('Udating Services'); update();}}
            /> 
          </Box>;
        user = 
          <Box
            fill='horizontal'
            background={{ color: 'light-1' }}
            border={{ color: 'dark-1', side: 'bottom' }}
            height='42px'
            justify='center'
            align='end'
            pad={{ right: '10%' }}
          >
            <Menu 
              label={username}
              icon={<User />}
              reverse
              items={[
                { label: 'Deployed Services', href: '/details' },
                { label: 'Log Out', href: '/login' }
              ]}
              dropBackground={{ "color": "light-1" }}
              dropAlign={{ top: 'top' }}
            />  
          </Box>;
        break;
      case 'Details': 
      case 'Register Broker': 
      case 'Unregister Broker': 
      case 'Deploy Service': 
      case 'Undeploy Service': 
        back = 
          <Link to='/catalog'>
            <Button
              plain
              color='brand'
              label='Catalog'
              margin={{ top: 'small' }}
              gap='xsmall'
              icon={<LinkPrevious size='medium' color='brand' />}
            />
          </Link> 
        break;
      default:
    }


		return (
      <Box>
        <Box
          direction='row'
          align='center'
          justify='center'
          pad={{ left: 'small' }}
          border={{ color: 'dark-1', side: 'bottom' }}
          background={{ color: 'white' }}
        >
          <Box width='5%' />
          <Box
            width='45%'
            direction='column'
            align='start'
            justify='center'
            pad={{ left: 'small', top: 'small' }}
            margin={{ bottom: 'small' }}
          >
            {back}
            <LogoAndTitle text={this.props.text} />
          </Box>
            {buttons}
        </Box>
        {user}
			</Box>
		);
	}
};

export default AppBar;
