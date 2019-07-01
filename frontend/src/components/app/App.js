import React, { Component } from "react";
import { Box, Grommet, Grid } from "grommet";
import { hpe } from "grommet-theme-hpe";
import AppBar from "../app-bar/AppBar";
import Footer from "../footer/Footer";
import "../app/App.css";


//========================================= App
export default class App extends Component {
	render() {
		return (
      <Grommet theme={hpe} full>
        <Box fill>
          <AppBar text='Heading here' />
          <Box className='body-and-footer' flex>
            <Box 
              className='main-content' 
              background={{color: 'light-1'}}
              border={{color: 'light-5', size: 'xsmall'}}
              pad='large'  
              flex
              overflow={{vertical: 'scroll'}}
            >
              <Grid 
                gap='large' 
                columns='small' 
                rows='small'
              > 
                <Card /><Card /><Card /><Card /><Card /><Card /><Card /><Card />
                <Card /><Card /><Card /><Card /><Card /><Card /><Card /><Card />
                <Card /><Card /><Card /><Card /><Card /><Card /><Card /><Card />
                <Card /><Card /><Card /><Card /><Card /><Card /><Card /><Card />
                <Card /><Card /><Card /><Card /><Card /><Card /><Card /><Card />
                <Card /><Card /><Card /><Card /><Card />
              </Grid>
            </Box>
            <Footer />
          </Box>
        </Box>
      </Grommet>
    );
  };
};
