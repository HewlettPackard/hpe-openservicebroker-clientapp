import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Box,
  Button,
  Layer,
  Form,
  FormField,
  Heading,
  Select,
  Text
} from 'grommet';
import { Add, FormClose } from 'grommet-icons';
import uuidv1 from 'uuid/v1';
import axios from 'axios';

//========================================= Deploy Form
class DeployForm extends Component {
  state = {
    plans: [...this.props.service.plans],
    planLabel: '',
    selectedPlan: {},
    canPress: true,
    toDeployed: false
  };

  setPlanMenuLabel = value => {
    let selectedPlan = {};
    this.state.plans.forEach(plan => {
      if (plan.name === value) selectedPlan = plan;
    });
    this.setState({ planLabel: value, selectedPlan: selectedPlan });
  };

  isNotEmpty(obj) {
    for (var key in obj) if (obj.hasOwnProperty(key)) return true;
    return false;
  }

  validateName = fieldVal => {
    const { instances } = this.props;
    if (fieldVal === ' ') return 'required';
    for (let i = 0; i < instances.length; i++)
      if (instances[i].name === fieldVal)
        return 'This name is already used for another instance.';
    return '';
  };

  setCanPress = bool => {
    this.setState({ canPress: bool });
  };

  handleSubmit = inputs => {
    const { service, setActivePath, updateInstances } = this.props;
    const val = uuidv1();
    const date = new Date();
    const maxPolling = service.maximum_polling_duration
      ? service.maximum_polling_duration
      : Infinity;

    let instance = {
      inputs,
      maxPolling,
      name: inputs.name,
      url: service.url,
      id: val,
      time: `${date.toTimeString()}  ${date.toLocaleDateString()}`,
      status: 'loading',
      returnedDetails: {}
    };
    delete instance.inputs.name;

    //api call
    let data = {
      service_id: service.id,
      plan_id: this.state.selectedPlan.id,
      parameters: inputs
    };
    axios
      .put(`${service.url}/v2/service_instances/${val}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'X-Broker-API-Version': 2.14
        }
      })
      .then(response => {
        console.log('successfully provisioning');
        updateInstances('add', instance);
        setActivePath('/deployed');
        this.setState({ toDeployed: true });
      })
      .catch(error => {
        console.log('failed provisioning');
        alert('The deployment failed');
      })
      .then(() => this.setState({ canPress: true }));
  };

  render() {
    const {
      plans,
      planLabel,
      name,
      selectedPlan,
      toDeployed,
      canPress
    } = this.state;
    const { toggleDeploy } = this.props;
    const planNames = plans.map(plan => plan.name);
    let planProperties = [];
    if (selectedPlan.hasOwnProperty('schemas')) {
      const properties =
        selectedPlan.schemas.service_instance.create.parameters.properties;
      for (let property in properties) {
        let obj = { [property]: properties[property] };
        planProperties[properties[property].index] = obj;
      }
    }

    return (
      <Layer full plain onEsc={toggleDeploy} animate={false}>
        {toDeployed && <Redirect to='/deployed' />}
        <Box direction='row' fill>
          <Box
            flex
            background={{ color: 'black', opacity: 'medium' }}
            onClick={toggleDeploy}
          />
          <Box
            background={{ color: 'dark-1' }}
            overflow={{ vertical: 'scroll' }}
            width='large'
            pad='small'
          >
            <Box className='deploy-form-header' direction='row' flex={false}>
              <Box justify='center' flex>
                <Button
                  icon={<FormClose size='large' color='accent-1' />}
                  onClick={toggleDeploy}
                />
              </Box>
              <Box align='center' flex>
                <Heading level='2'>Deploy Service</Heading>
              </Box>
              <Box flex /> {/* empty box to center heading */}
            </Box>
            <Box align='center' justify='start' pad='medium' flex={false}>
              <Form>
                <Select
                  plain
                  placeholder='select plan'
                  value={planLabel}
                  onChange={({ option }) => this.setPlanMenuLabel(option)}
                  options={[...planNames]}
                  minstancein='medium'
                />
              </Form>
              <Box width='large'>
                {this.isNotEmpty(selectedPlan) && (
                  <Box className='deploy-form-description-box'>
                    <Box>
                      <Heading level='3'>
                        <strong>Description</strong>
                      </Heading>
                    </Box>
                    <Box background={{ color: 'accent-1' }} height='2px' />
                    <Box direction='row' margin={{ top: 'small' }}>
                      <Box flex justify='start'>
                        <Text size='large'>Description: </Text>
                      </Box>
                      <Box flex justify='center' align='start' fill='vertical'>
                        <Text size='large' wordBreak='break-all'>
                          {selectedPlan.description}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                )}
                {this.isNotEmpty(selectedPlan) && !selectedPlan.free && (
                  <Box className='prices-box'>
                    <Box>
                      <Heading level='3'>
                        <strong>Price Options</strong>
                      </Heading>
                    </Box>
                    <Box background={{ color: 'accent-1' }} height='2px' />
                    {selectedPlan.metadata.costs.map(cost => (
                      <Box
                        direction='row'
                        margin={{ top: 'small' }}
                        key={cost.amount.usd}
                      >
                        <Box flex justify='start'>
                          <Text size='large'>Price: </Text>
                        </Box>
                        <Box flex justify='center' align='start'>
                          <Text size='large' wordBreak='break-all'>{`$${
                            cost.amount.usd
                          } for ${cost.unit}`}</Text>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
                {this.isNotEmpty(selectedPlan) && selectedPlan.free && (
                  <Box className='prices-box'>
                    <Box>
                      <Heading level='3'>
                        <strong>Price Options</strong>
                      </Heading>
                    </Box>
                    <Box background={{ color: 'accent-1' }} height='2px' />
                    <Box direction='row' margin={{ top: 'small' }}>
                      <Box flex justify='start'>
                        <Text size='large'>Price: </Text>
                      </Box>
                      <Box flex justify='center' align='start'>
                        <Text size='large'>Free</Text>
                      </Box>
                    </Box>
                  </Box>
                )}
                {this.isNotEmpty(selectedPlan) && (
                  <Box className='parameters-box'>
                    <Box>
                      <Heading level='3'>
                        <strong>Inputs</strong>
                      </Heading>
                    </Box>
                    <Box background={{ color: 'accent-1' }} height='2px' />
                    <Form
                      onSubmit={({ value }) => {
                        this.handleSubmit(value, name);
                        this.setCanPress(false);
                      }}
                    >
                      <FormField
                        required
                        name='name'
                        label='Name'
                        placeholder='Name the instance'
                        validate={this.validateName}
                        value={name}
                      />
                      {planProperties.map(property => {
                        const propertyName = property[Object.keys(property)[0]];
                        if (propertyName.type === 'string') {
                          return (
                            <FormField
                              required
                              plain
                              name={Object.keys(property)[0]}
                              label={Object.keys(property)[0]}
                              key={Object.keys(property)[0]}
                              placeholder={propertyName.description}
                            />
                          );
                        } else if (propertyName.type === 'object')
                          return (
                            <FormField
                              required
                              plain
                              component={Select}
                              name={Object.keys(property)[0]}
                              label={Object.keys(property)[0]}
                              key={Object.keys(property)[0]}
                              placeholder={propertyName.description}
                              options={propertyName.allowedValues}
                            />
                          );
                      })}
                      <Box align='center'>
                        <Button
                          label='Deploy'
                          margin='medium'
                          type='submit'
                          icon={<Add />}
                          flex={false}
                          disabled={!canPress}
                        />
                      </Box>
                    </Form>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Layer>
    );
  }
}

export default DeployForm;
