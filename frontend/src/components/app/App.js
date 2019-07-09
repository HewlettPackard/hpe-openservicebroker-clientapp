import React, { Component, ReactDOM } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Box, Button, Grommet, Layer, Heading } from "grommet";
import { FormClose } from "grommet-icons";
import { hpe } from "grommet-theme-hpe";
import AppBar from "../app-bar/AppBar";
import Footer from "../footer/Footer";
import CatalogResults from "../catalog-results/CatalogResults";
import DeployForm from "../forms/DeployForm";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import Details from "../details/Details";
import "../app/App.css";
import axios from "axios";


//========================================= App
export default class App extends Component {
	//set initial state
	state = {
    detailsOpen: false,
    username: ''
  };

  logIn = (input) => {
    this.setState({ username: input });
  }

  toggleDetailsLayer = () => {
    this.setState({ detailsOpen: !this.state.detailsOpen });
  }


  //render the app
  render() {
    const { detailsOpen, services, username } = this.state;

    return (
      <Router>
      <Grommet theme={hpe} full>
        <Box fill background={{ color: "light-4" }}>
          <Switch>
            {/*Pass text to AppBar heading based on route*/}
            <Route exact path="/" render={() => <AppBar text="Login" />} />
            <Route path="/login" render={() => <AppBar text="Login" />}  />
            <Route path="/home" render={() => <AppBar text="Catalog" username={username} goToDetails={this.toggleDetailsLayer} />} />
            <Route path="/catalog" render={() => <AppBar text="Catalog" username={username} goToDetails={this.toggleDetailsLayer} />} />
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
                <Route path="/details" component={Details} />
                <Route path="/deploy/" component={DeployForm} />
              </Switch>
              { detailsOpen && 
                <Details toggle={this.toggleDetailsLayer} />
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
