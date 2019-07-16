import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box, Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import Sidebar from '../sidebar/Sidebar';
import AppBar from '../app-bar/AppBar';
import Footer from '../footer/Footer';
import CatalogResults from '../catalog-results/CatalogResults';
import DeployForm from '../forms/DeployForm';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import Settings from '../forms/Settings';
import BrokerList from '../broker-list/BrokerList';
import DeployedList from '../deployed-list/DeployedList';
import Help from '../help/Help';
import '../app/App.css';


//========================================= App
export default class App extends Component {
	//set initial state
	state = {
    username: 'user name',
    onLoginPage: false,
    instances: []
  };

  logIn = (input) => {
    this.setState({ username: input, onLoginPage: false });
  }

  hideSideBar = () => {
    this.setState({ onLoginPage: true });
  }

  updateInstances = (command, instance) => {
    if (command === 'add') {
      let newInstances = [...this.state.instances];
      if (instance.name !== '')
        newInstances.push(instance);
      this.setState({ instances: [...newInstances] });
    }
    if (command === 'delete') {
      let newInstances = [...this.state.instances];
      for (const i=0; i<newInstances.length; i++)
        if (newInstances[i].name === instance.name)
          newInstances.splice(i,1);
      this.setState({ instances: [...newInstances] });
    }
  }


  //render the app
  render() {
    const { onLoginPage, instances, username } = this.state;

    return (
      <Router>
      <Grommet theme={hpe} full>
        <Box className='page' fill direction='row' >
          { !onLoginPage && ( 
              <Box>
                <Sidebar username={username} /> 
                {/* empty box to fix catalog width due to static sidebar */}
                <Box fill='vertical' width='20rem' /> 
              </Box>
            )
          }
          <Box className='non-sidebar' flex>
            <Box className='header-and-body' height='120vh' flex={false} overflow={{ vertical: 'scroll' }}>
              <Route path='/' component={AppBar} />
              <Box className='body' overflow={{vertical:'scroll'}} flex>
                <Switch>
                  {/*Routing - Catalog is the home route*/}
                  <Route exact path='/' render={() => <LoginForm logIn={this.logIn} hideSideBar={this.hideSideBar} />} />
                  <Route path='/login' render={() => <LoginForm logIn={this.logIn} />} hideSideBar={this.hideSideBar} />
                  <Route path='/catalog' render={() => <CatalogResults updateInstances={this.updateInstances} />} />
                  <Route path='/deployed' render={() => <DeployedList updateInstances={this.updateInstances} instances={instances} />} />
                  <Route path='/settings' component={Settings} />
                  <Route path='/help' component={Help} />
                </Switch>
              </Box> {/*end of body box*/}
            </Box> {/*end of header-and-body box*/}
            <Footer />
          </Box> {/*end of non-sidebar box*/}
        </Box> {/*end of page box*/}
]      </Grommet>
      </Router>
    );
	}
}
