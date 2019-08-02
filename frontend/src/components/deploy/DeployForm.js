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
  Text,
  TextInput
} from 'grommet';
import { Add, FormClose } from 'grommet-icons';
import uuidv1 from 'uuid/v1';
import axios from 'axios';
import config from '../../config';

//========================================= Deploy Form
class DeployForm extends Component {
  state = {
    parameterValues: [],
    parameterLabels: null,
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

  setParameterValue = (value, index) => {
    let newValues = [...this.state.parameterValues];
    if (newValues.length < index)
      while (newValues.length < index) newValues.push(undefined);
    newValues[index] = value;
    this.setState({ parameterValues: [...newValues] });
  };

  setParameterLabels = labels => {
    this.setState({ parameterLabels: [...labels] });
  };

  isNotEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return true;
    }
    return false;
  }

  validateName = fieldVal => {
    const { instances } = this.props;
    for (let i = 0; i < instances.length; i++)
      if (instances[i].name === fieldVal)
        return 'This name is already used for another instance.';
    return '';
  };

  handleInputChange = (input, index) => {
    let temp = [...this.state.parameterValues];
    temp[index] = input;
    this.setState({ parameterValues: [...temp] });
  };

  setCanPress = bool => {
    this.setState({ canPress: bool });
  };

  handleDeploy = ({ name }) => {
    const { instances } = this.props;
    for (let i = 0; i < instances.length; i++) {
      if (instances[i].name === name) {
        this.setState({ canPress: true });
        return;
      }
    }

    let instance = {};
    let val = uuidv1();
    instance.name = name;
    instance.id = val;
    instance.status = 'loading';
    var date = new Date();
    instance.time = `${date.toTimeString()}  ${date.toLocaleDateString()}`;
    const inputs = [];

    for (let index in this.state.parameterLabels)
      inputs[index] = {
        label: this.state.parameterLabels[index],
        value: this.state.parameterValues[index]
      };

    instance.inputs = [...inputs];
    instance.maxPolling = this.props.service.maximum_polling_duration;

    //api call
    console.log('service.id', this.props.service.id);
    let data = {
      service_id: this.props.service.id,
      plan_id: '2a44ed0e-2c09-4be6-8a81-761ddba2f733'
    };
    console.log(`${config.apiUrl}/service_instances/${val}`);
    axios
      .put(`${config.apiUrl}/service_instances/${val}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'X-Broker-API-Version': 2.14
        }
      })
      .then(response => {
        console.log('successfully provisioning');
      })
      .catch(error => {
        console.log('failed provisioning');
        instance.status = 'failed';
      })
      .then(() => {
        this.props.updateInstances('add', instance);
        this.props.setActivePath('/deployed');
        this.setState({ toDeployed: true });
      });
  };

  render() {
    const {
      parameterValues,
      parameterLabels,
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
    if (parameterLabels === null) {
      const propertyNames = planProperties.map(property => {
        return Object.keys(property);
      });
      if (propertyNames.length > 0) this.setParameterLabels(propertyNames);
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
                        this.handleDeploy(value);
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
                              onChange={input => {
                                this.handleInputChange(
                                  input.target.value,
                                  propertyName.index
                                );
                              }}
                            />
                          );
                        } else if (propertyName.type === 'object') {
                          let label =
                            parameterValues !== undefined
                              ? parameterValues[propertyName.index]
                              : '';
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
                              onChange={option => {
                                this.setParameterValue(
                                  option.value,
                                  propertyName.index
                                );
                              }}
                              value={label}
                            />
                          );
                        }
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
