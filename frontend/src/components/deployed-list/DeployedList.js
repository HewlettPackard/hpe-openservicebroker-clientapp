import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Text } from 'grommet';
import Card from '../services-card/Card';
import DeployedDetail from '../deployed-detail/DeployedDetail';
import axios from 'axios';

//========================================= Deployed List
export default class Deployments extends Component {
  state = {
    instance: {},
    detailsOpen: false
  };

  handleDelete = () => {};

  toggleDetails = instance => {
    this.setState({ detailsOpen: !this.state.detailsOpen, instance: instance });
  };

  timers = [];
  pollingCounters = [];

  componentDidMount() {
    const { instances, updateInstances } = this.props;
    this.timers.length = instances.length;
    this.pollingCounters.length = instances.length;

    for (let i = 0; i < instances.length; i++) {
      this.timers[i] = null;
      this.pollingCounters[i] = 0;

      if (instances[i].status === 'loading') {
        this.timers[i] = setInterval(() => {
          this.pollingCounters[i] = new Date().getTime() / 1000;
          axios
            .get(
              `${instances[i].url}/v2/service_instances/${
                instances[i].id
              }/last_operation`,
              {
                headers: {
                  'X-Broker-API-Version': 2.14
                }
              }
            )
            .then(result => {
              console.log('last op result', result);
              if (result.data.state === 'succeeded') {
                updateInstances('loaded', instances[i], result.data);
                clearInterval(this.timers[i]);
                console.log(
                  `clear interval for timer[${i}] due to successful deployment`
                );
              }
              if (result.data.state === 'failed') {
                updateInstances('delete', instances[i]);
                clearInterval(this.timers[i]);
                console.log(
                  `clear interval for timer[${i}] due to failed deployment`
                );
              }
            })
            .catch(error => {
              updateInstances('delete', instances[i]);
              clearInterval(this.timers[i]);
              console.log(
                `cleared interval for timer[${i}] due to error getting last op`
              );
            })
            .then(() => {
              if (
                new Date().getTime() / 1000 - this.pollingCounters[i] >
                instances[i].maxPolling
              ) {
                updateInstances('delete', instances[i]);
                clearInterval(this.timers[i]);
                console.log(
                  `clear interval for timer[${i}] due to maxiumum last op polling`
                );
              }
              this.pollingCounters[i] = new Date().getTime() / 1000;
            });
        }, 3000);
      }
    }
  }

  render() {
    const { detailsOpen, instance } = this.state;
    const { instances, setActivePath, updateInstances } = this.props;

    return (
      <Box pad='large' fill>
        {instances.length > 0 && (
          <Grid gap='large' columns='small' rows='small'>
            {instances.map(instance => (
              <Card
                instance={instance}
                fromDeployed
                toggleDetails={this.toggleDetails}
                key={instance.name}
              />
            ))}
          </Grid>
        )}
        {instances.length === 0 && (
          <Box
            className='empty-deployed-list-message'
            align='center'
            gap='medium'
          >
            <Text size='xlarge'>
              You do not have any deployed services. Deploy a service in the
              catalog.
            </Text>
            <Link
              to='/catalog'
              style={{ color: '#01a982' }}
              onClick={() => setActivePath('/catalog')}
            >
              <Text size='large' color='brand'>
                Catalog
              </Text>
            </Link>
          </Box>
        )}
        {detailsOpen && (
          <DeployedDetail
            toggleDetails={this.toggleDetails}
            instance={instance}
            updateInstances={updateInstances}
          />
        )}
      </Box>
    );
  }
}
