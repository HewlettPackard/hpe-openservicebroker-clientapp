import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Text, TextInput } from 'grommet';
import Card from '../services-card/Card';
import DeployForm from '../deploy/DeployForm';

//========================================= Catalog Results
class CatalogResults extends Component {
  state = {
    deployFormOpen: false,
    notYetSearched: true,
    value: '',
    services: [...this.props.services],
    showList: [...this.props.services],
    service: {}
  };

  search = (value, listToSearch) => {
    let tempList = [];

    if (value === '' && this.state.notYetSearched) return [];
    else {
      listToSearch.forEach(service => {
        if (service.name.search(value) !== -1) tempList.push(service);
      });
      return tempList;
    }
  };

  setValue = event => {
    if (
      event.target.value.search(
        /[a-z]?(\\|!|@|#|\$|%|\^|&|\*|\(|\)|-|\+)+/i
      ) !== -1
    )
      return;
    else {
      const tempList = this.search(event.target.value, this.state.services);
      this.setState({
        value: event.target.value,
        notYetSearched: false,
        showList: [...tempList]
      });
    }
  };

  toggleDeploy = service => {
    this.setState({
      deployFormOpen: !this.state.deployFormOpen,
      service: service
    });
  };

  render() {
    const { deployFormOpen, service, services, showList, value } = this.state;
    const { setActivePath, instances, updateInstances } = this.props;
    let showEmptyMessage = false;
    if (services.length === 0) showEmptyMessage = true;

    return (
      <Box pad='large' fill>
        {showEmptyMessage && (
          <Box className='empty-catalog-message' align='center' gap='medium'>
            <Text size='xlarge'>
              You do not have any brokers registered. Register a broker to
              access services.
            </Text>
            <Link
              to='/settings'
              style={{ color: '#01a982' }}
              onClick={() => setActivePath('/settings')}
            >
              <Text size='large' color='brand'>
                Register Broker
              </Text>
            </Link>
          </Box>
        )}
        {!showEmptyMessage && (
          <Box gap='large' fill>
            <Box
              flex={false}
              width='medium'
              border={{ size: 'xsmall', color: 'light-5' }}
              alignSelf='center'
            >
              <TextInput
                placeholder='search'
                value={value}
                onChange={this.setValue}
              />
            </Box>
            <Box>
              <Grid gap='large' columns='small' rows='small'>
                {showList.map(service => (
                  <Card
                    service={service}
                    key={service.name}
                    toggleDeploy={this.toggleDeploy}
                  />
                ))}
              </Grid>
            </Box>
          </Box>
        )}
        {deployFormOpen && (
          <DeployForm
            toggleDeploy={this.toggleDeploy}
            service={service}
            updateInstances={updateInstances}
            instances={instances}
            setActivePath={setActivePath}
          />
        )}
      </Box>
    );
  }
}

export default CatalogResults;
