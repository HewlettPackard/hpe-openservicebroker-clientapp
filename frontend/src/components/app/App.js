import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box, Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import Sidebar from '../sidebar/Sidebar';
import AppBar from '../app-bar/AppBar';
import Footer from '../footer/Footer';
import CatalogResults from '../catalog-results/CatalogResults';
import LoginForm from '../help/LoginForm';
import Settings from '../register/Settings';
import DeployedList from '../deployed-list/DeployedList';
import Help from '../help/Help';
import '../app/App.css';

//========================================= App
export default class App extends Component {
  //set initial state
  state = {
    username: '',
    onLoginPage: false,
    instances: [],
    services: [],
    brokers: [
      {
        name: 'grommet',
        description: 'grommet description',
        inputs: [
          { url: 'https://url' },
          { username: 'username' },
          { password: 'password' }
        ],
        status: 'loaded'
      },
      {
        name: 'devops',
        description: 'devops description',
        inputs: [
          { url: 'https://url' },
          { username: 'username' },
          { password: 'password' }
        ],
        status: 'loaded'
      }
    ],
    activePath: '/catalog'
  };

  logIn = input => {
    this.setState({ username: input, onLoginPage: false });
  };

  hideSideBar = () => {
    this.setState({ onLoginPage: true });
  };

  setActivePath = path => {
    this.setState({ activePath: path });
  };

  updateInstances = (command, instance) => {
    if (command === 'add') {
      let newInstances = [...this.state.instances];
      newInstances.push(instance);
      this.setState({ instances: [...newInstances] });
    }
    if (command === 'delete') {
      let newInstances = [...this.state.instances];
      for (let i = 0; i < newInstances.length; i++)
        if (newInstances[i].name === instance.name) newInstances.splice(i, 1);
      this.setState({ instances: [...newInstances] });
    }
    if (command === 'loaded') {
      let newInstances = [...this.state.instances];
      let newElement = newInstances.find(element => element.id === instance.id);
      newElement.status = 'loaded';
      newInstances = newInstances.filter(element => element.id !== instance.id);
      newInstances.push(newElement);
      this.setState({ instances: [...newInstances] });
    }
    if (command === 'failed') {
      let newInstances = [...this.state.instances];
      let newElement = newInstances.find(element => element.id === instance.id);
      newElement.status = 'failed';
      newInstances = newInstances.filter(element => element.id !== instance.id);
      newInstances.push(newElement);
      this.setState({ instances: [...newInstances] });
    }
  };

  updateBrokers = (command, broker, editedBroker) => {
    if (command === 'add') {
      let newBrokers = [...this.state.brokers];
      newBrokers.push(broker);
      this.setState({ brokers: [...newBrokers] });
    }
    if (command === 'delete') {
      let newBrokers = [...this.state.brokers];
      for (let i = 0; i < newBrokers.length; i++)
        if (newBrokers[i].name === broker.name) newBrokers.splice(i, 1);
      this.setState({ brokers: [...newBrokers] });
    }
    if (command === 'edit') {
      let newBrokers = [...this.state.brokers];
      for (let i = 0; i < newBrokers.length; i++)
        if (newBrokers[i].name === broker.name) {
          newBrokers.splice(i, 1);
          newBrokers.push(editedBroker);
        }
      this.setState({ brokers: [...newBrokers] });
    }
  };

  updateServices = newServices => {
    if (this.state.services.length > 0) {
      let keptServices = newServices.filter(service => {
        for (let i = 0; i < this.state.services.length; i++)
          if (service.name !== this.state.services[i].name) return service;
      });
      this.setState({
        services: [...this.state.services, ...keptServices]
      });
    } else this.setState({ services: [...newServices] });
  };

  componentDidMount() {
    if (window.location.pathname === '/')
      this.setState({ activePath: '/catalog' });
    else this.setState({ activePath: window.location.pathname });
  }

  //render the app
  render() {
    const {
      activePath,
      onLoginPage,
      instances,
      services,
      brokers,
      username
    } = this.state;

    return (
      <Router>
        <Grommet theme={hpe}>
          <Box className='page' direction='row' height='100vh'>
            {!onLoginPage && (
              <Sidebar
                username={username}
                activePath={activePath}
                setActivePath={this.setActivePath}
              />
            )}
            <Box className='non-sidebar' flex overflow='auto'>
              <Box className='header-and-body' flex>
                <Route path='/' component={AppBar} />
                <Box className='body' flex>
                  <Switch>
                    <Route
                      exact
                      path='/'
                      render={() => (
                        <LoginForm
                          logIn={this.logIn}
                          hideSideBar={this.hideSideBar}
                        />
                      )}
                    />
                    <Route
                      path='/login'
                      render={() => <LoginForm logIn={this.logIn} />}
                      hideSideBar={this.hideSideBar}
                    />
                    <Route
                      path='/catalog'
                      render={() => (
                        <CatalogResults
                          updateInstances={this.updateInstances}
                          instances={instances}
                          services={services}
                          setActivePath={this.setActivePath}
                        />
                      )}
                    />
                    <Route
                      path='/deployed'
                      render={() => (
                        <DeployedList
                          updateInstances={this.updateInstances}
                          instances={instances}
                          setActivePath={this.setActivePath}
                        />
                      )}
                    />
                    <Route
                      path='/settings'
                      render={() => (
                        <Settings
                          updateBrokers={this.updateBrokers}
                          updateServices={this.updateServices}
                          brokers={brokers}
                        />
                      )}
                    />
                    <Route path='/help' component={Help} />
                  </Switch>
                </Box>
              </Box>
              {onLoginPage && (
                <Box width='100%' background='light-2' align='center'>
                  <Footer />
                </Box>
              )}
            </Box>
          </Box>
        </Grommet>
      </Router>
    );
  }
}
