import React, { Component } from "react";
import { BrowserRouter as Router,
         Link, Route, Switch } from "react-router-dom";
import { Box, Grommet, Grid } from "grommet";
import { hpe } from "grommet-theme-hpe";
import AppBar from "../app-bar/AppBar";
import Footer from "../footer/Footer";
import CatalogResults from "../catalog-results/CatalogResults";
import DeployForm from "../forms/DeployForm";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import "../app/App.css";


//========================================= App
export default class App extends Component {
	render() {
		return (
      <Router>
        <Grommet theme={hpe} full>
          <Box fill>
            <AppBar text='Heading Here' />
            <Box className='body-and-footer' flex>
              <Box 
                className='main-content' 
                background={{color: 'light-1'}}
                border={{color: 'light-5', size: 'xsmall'}}
                pad='large'  
                flex
                overflow={{vertical: 'scroll'}}
                >
                <Switch> //Routing - Catalog is the home route
                  <Route exact path='/' component={CatalogResults} />
                  <Route path='/catalog' component={CatalogResults} />
                  <Route path='/home' component={CatalogResults} />
                  <Route path='/deploy' component={DeployForm} />
                  <Route path='/login' component={LoginForm} />
                  <Route path='/register' component={RegisterForm} />
                </Switch>
              </Box>
              <Footer />
            </Box>
          </Box>
        </Grommet>
      </Router>
    );
  };
};
