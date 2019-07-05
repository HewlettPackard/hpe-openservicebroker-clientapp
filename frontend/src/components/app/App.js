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
import "../app/App.css";
import axios from "axios";


//========================================= App
export default class App extends Component {
	//set initial state
	state = {
    services: []
  };

	//request catalog from the broker API
	async componentDidMount() {
	  try {
	    var request = new Request('http://54.197.219.166:7099/v2/catalog', {
	      headers: new Headers({
	        'X-Broker-API-Version': '2.13',
	        'X-Broker-API-Originating-Identity': 'user1 password'
	      })
	    });
	    await fetch(request)
      .then(result => result.json())
      .then(resultJSON => {
        this.setState(
          { services: [...resultJSON.services] }
        );
        console.log(JSON.stringify(resultJSON));
      }
      );
	  } catch(e) {
	    console.log(e);
	  }
  }

  // //request catalog from the broker API
	// componentDidMount() {
  //   axios.get('http://54.152.27.68:7099/v2/catalog',
  //     { 
  //       headers: { 
  //         'X-Broker-API-Version': '2.13', 
  //       },
  //       auth: {
  //         username: "",
  //         password: ""
  //       }
  //     }
	// 	)
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

  
    //render the app
    render() {
      const { services } = this.state;

      return (
        <Router>
				<Grommet theme={hpe} full>
					<Box fill background={{ color: "light-4" }}>
						<Switch>
							{/*Pass text to AppBar heading based on route*/}
							<Route exact path="/" render={() => <AppBar text="Catalog" />} />
							<Route path="/home" render={() => <AppBar text="Catalog" />} />
							<Route path="/catalog" render={() => <AppBar text="Catalog" />} />
							<Route path="/login" render={() => <AppBar text="Login" />} />
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
									<Route exact path="/" render={() => <CatalogResults services={services} />} />
									<Route path="/home" render={() => <CatalogResults services={services} />} />
									<Route path="/catalog" render={() => <CatalogResults services={services} />} />
									<Route path="/login" component={LoginForm} />
									<Route path="/deploy" component={DeployForm} />
									<Route path="/register" component={RegisterForm} />
								</Switch>
							</Box>
							<Footer />
						</Box>
					</Box>
				</Grommet>
			</Router>
		);
	}
}
