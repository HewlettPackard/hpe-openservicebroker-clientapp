import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box } from 'grommet';
import LogoAndTitle from '../logo-and-title/LogoAndTitle';

//========================================= AppBar
const AppBar = props => {
  const path = props.location.pathname;
  if (path !== '/' && path !== '/login') {
    return (
      <Box
        fill='horizontal'
        height='5rem'
        border={{ color: 'light-5', side: 'bottom', size: 'small' }}
        pad={{ vertical: 'small', horizontal: 'large' }}
        elevation='xsmall'
      >
        {/* change text based on route */}
        <Switch>
          <Route exact path='/' render={() => <LogoAndTitle text='Login' />} />
          <Route path='/login' render={() => <LogoAndTitle text='Login' />} />
          <Route path='/home' render={() => <LogoAndTitle text='Catalog' />} />
          <Route
            path='/catalog'
            render={() => <LogoAndTitle text='Catalog' />}
          />
          <Route
            path='/deploy'
            render={() => <LogoAndTitle text='Deploy Service' />}
          />
          <Route
            path='/deployed'
            render={() => <LogoAndTitle text='Deployed Services' />}
          />
          <Route
            path='/register'
            render={() => <LogoAndTitle text='Register Broker' />}
          />
          <Route
            path='/settings'
            render={() => <LogoAndTitle text='Broker Settings' />}
          />
          <Route path='/help' render={() => <LogoAndTitle text='Help' />} />
        </Switch>
      </Box>
    );
  } else return <Box />;
};

export default AppBar;
