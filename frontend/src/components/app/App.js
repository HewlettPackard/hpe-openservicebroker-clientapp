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
    services: [],
    username: ''
  };

  //update the service catalog by calling the API
  async update() {
    try {
      var request = new Request('http://3.86.206.101:8099/v2/catalog', {
        headers: new Headers({
           'X-Broker-API-Version': '2.13',
        })
      });
	    await fetch(request)
      .then(result => result.json())
      .then(resultJSON => {
        this.setState(
          { services: [...resultJSON.services] }
        );
      });
    } catch(e) {
        console.log(e);
    }
  }
    
    //to get the service catalog initially
    async componentDidMount() {
      this.update();  
    }
    
  // //update the service catalog by calling the API
  // async update() {
  //   axios.get('http://54.152.27.68:7099/v2/catalog',
  //     { 
  //       headers: { 
  //         'X-Broker-API-Version': '2.13', 
  //     },
  //       auth: {
  //         username: "",
  //         password: ""
  //       }
  //     }
  //   )
  //   .then(result => {
  //     console.log(result);
  //     this.setState(
  //       { services: [...result.services] }
  //     );
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }
                
  // //to get the service catalog initially
  // componentDidMount() {
  //   this.update();
  // }
  

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
            <Route exact path="/" render={() => <AppBar text="Login" update={this.update} />} />
            <Route path="/login" render={() => <AppBar text="Login" update={this.update} />}  />
            <Route path="/home" render={() => <AppBar text="Catalog" update={this.update} username={username} goToDetails={this.toggleDetailsLayer} />} />
            <Route path="/catalog" render={() => <AppBar text="Catalog" update={this.update} username={username} goToDetails={this.toggleDetailsLayer} />} />
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
                <Route path="/home" render={() => <CatalogResults services={services} />} />
                <Route path="/catalog" render={() => <CatalogResults services={services} />} />
                <Route path="/register" component={RegisterForm} />
                <Route path="/details" component={Details} />
                <Route 
                  path="/deploy/:name" 
                  render={(obj) => {
                    const { name } = obj.match.params;
                    const serviceArg = this.state.services.find((service) => service.name === name);
                    let plans = [];
                    if (serviceArg === undefined) {plans = []}
                    else {plans = serviceArg.plans}
                    return (<DeployForm plans={plans} match={obj.match} />);
                  }} 
                />
              </Switch>
              { detailsOpen && 
                <Layer 
                  full
                  plain
                  onEsc={() => this.toggleDetailsLayer()}
                >
                  <Box 
                    fill 
                    background={{ color: 'light-2', opacity: 'strong' }} 
                    pad='medium' 
                    width='xlarge'
                    align='center'  
                  >
                    <Box 
                      background={{ color: 'white' }} 
                      height='100%' 
                      width='90%'
                    >
                      <Box justify='center' direction='row'>
                        <Box flex align='center'>
                          <Heading color='brand'>Details</Heading>
                        </Box>
                        <Box justifySelf='end' align='start' width='80px'>
                          <Button icon={<FormClose size='large' />} onClick={this.toggleDetailsLayer} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Layer>
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
