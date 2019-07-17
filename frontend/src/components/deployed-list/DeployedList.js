import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Text } from 'grommet';
import Card from '../card/Card';
import DeployedDetail from '../deployed-detail/DeployedDetail';
import axios from 'axios';  


//========================================= Deployed List
export default class Deployments extends Component {
  state = {
    instance: {},
    detailsOpen: false
  };

  handleDelete = () => {

  }

  toggleDetails = (instance) => {
    this.setState({ detailsOpen: !this.state.detailsOpen, instance: instance });
  }


  render() {
    const { detailsOpen, instance } = this.state;;
    const { instances } = this.props;;

    return (
      <Box pad='large' fill>
        { (instances.length > 0) && (
            <Grid gap='large' columns='small' rows='small'>
              {instances.map(instance => 
                <Card instance={instance} fromDeployed toggleDetails={this.toggleDetails} key={instance.name} />
              )}
            </Grid>
          )
        }
        { (instances.length === 0) && (
            <Box className='empty-deployed-list-message' align='center' gap='medium'>
              <Text size='xlarge' color=''>You do not have any deployed services. Deploy a service in the catalog.</Text>
              <Link to='/catalog' style={{ color: '#01a982' }}>
                <Text size='large' color='brand'>Catalog</Text>
              </Link>
            </Box>
          )
        }
        { detailsOpen && 
            <DeployedDetail toggleDetails={this.toggleDetails} instance={instance} />
        }
      </Box>
    );
  }
}