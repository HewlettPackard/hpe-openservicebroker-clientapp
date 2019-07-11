import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Box, Grommet } from "grommet";
import { hpe } from "grommet-theme-hpe";
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
    detailsOpen: false,
    deployedListOpen: false,
    brokerListOpen: false,
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
    const { deployedListOpen, brokerListOpen, services, username } = this.state;

    return (
      <Router>
      <Grommet theme={hpe} full>
        <Box fill background={{ color: "light-4" }}>
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

          <Box className="body-and-footer" align="center" flex>
            <Box
              width="100rem"
              className="main-content"
              background={{ color: "white" }}
              border={{ color: "light-5", size: "xsmall" }}
              pad="large"
              flex
              overflow={{ vertical: "scroll" }}
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
              { deployedListOpen && 
                <DeployedList toggle={this.toggleDeployedList} fromUserMenu={false} />
              }
              { brokerListOpen && 
                <BrokerList toggle={this.toggleBrokerList} />
              }
            </Box>
            <Footer />
          </Box>
        </Box>
      </Grommet>
      </Router>
    );
	}
}
