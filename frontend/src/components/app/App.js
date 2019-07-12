import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Box, Grommet } from "grommet";
import { hpe } from "grommet-theme-hpe";
import Sidebar from "../sidebar/Sidebar";
import AppBar from "../app-bar/AppBar";
import Footer from "../footer/Footer";
import CatalogResults from "../catalog-results/CatalogResults";
import DeployForm from "../forms/DeployForm";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import BrokerList from "../broker-list/BrokerList";
import DeployedList from "../deployed-list/DeployedList";
import "../app/App.css";
import axios from "axios";


//========================================= App
export default class App extends Component {
	//set initial state
	state = {
    username: ''
  };

  logIn = (input) => {
    this.setState({ username: input });
  }

  toggleBrokerList = () => {
    this.setState({ brokerListOpen: !this.state.brokerListOpen });
  }

  toggleDeployedList = () => {
    this.setState({ deployedListOpen: !this.state.deployedListOpen });
  }


  //render the app
  render() {
    let onLoginPage = false;
    const { deployedListOpen, brokerListOpen, services, username } = this.state;

    return (
      <Router>
      <Grommet theme={hpe} full>
        <Box 
          className='page' 
          fill
          direction='row'
        >
          { !onLoginPage && ( 
              <Box>
                <Sidebar /> 
                {/* empty box to fix catalog width */}
                 <Box fill='vertical' width='16rem' /> 
              </Box>
            )
          }
          <Box className="non-sidebar" flex>
            <Box className='header-and-body' height='120vh' flex={false} overflow={{ vertical: 'scroll' }}>
              <Switch>
                {/*Pass text to AppBar heading based on route*/}
                <Route exact path="/" render={() => <AppBar text="Login" />} />
                <Route path="/login" render={() => <AppBar text="Login" />}  />
                <Route path="/home" render={() => <AppBar text="Catalog" username={username} openBrokerList={this.toggleBrokerList} openDeployedList={this.toggleDeployedList} />} />
                <Route path="/catalog" render={() => <AppBar text="Catalog" username={username} openBrokerList={this.toggleBrokerList} openDeployedList={this.toggleDeployedList} />} />
                <Route
                  path="/deploy"
                  render={() => <AppBar text="Deploy Service" />}
                  />
                <Route
                  path="/register"
                  render={() => <AppBar text="Register Broker" />}
                  />
              </Switch>
              <Box
                className="body"
                pad="large"
                overflow={{vertical:'scroll'}}
                flex
              >
                <Switch>
                  {/*Routing - Catalog is the home route*/}
                  <Route exact path="/" render={() => <LoginForm logIn={this.logIn} />} />
                  <Route path="/login" render={() => <LoginForm logIn={this.logIn} />} />
                  <Route path="/home" render={() => <CatalogResults />} />
                  <Route path="/catalog" render={() => <CatalogResults />} />
                  <Route path="/register" component={RegisterForm} />
                  <Route path="/deploy/" component={DeployForm} />
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
