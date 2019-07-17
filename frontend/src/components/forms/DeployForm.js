import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Layer, Form, FormField, Heading, Select, Text, TextInput } from 'grommet';
import { Add, FormClose } from 'grommet-icons';
import uuidv1 from 'uuid/v1';  
import axios from 'axios';


//========================================= Deploy Form
class DeployForm extends Component {
  state = {
    parameterMenuLabels: [],
    plans: [...this.props.service.plans],
    planLabel: '',
    name: '',
    selectedPlan: {}
  }

  setPlanMenuLabel = (value) => {
    let selectedPlan = {};

    this.state.plans.forEach(plan => {
      if (plan.name === value) 
        selectedPlan = plan;
    });
    this.setState({ planLabel: value, selectedPlan: selectedPlan});
  }

  setParamterMenuLabel = (value, index) => {
    let newLabels = [...this.state.parameterMenuLabels];

    if (newLabels.length < index) 
      while (newLabels.length < index)
        newLabels.push(undefined);
    newLabels[index] = value;
    this.setState({ parameterMenuLabels: [...newLabels] });
  }

  isNotEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return true;
    }
    return false;
  }

  handleInputChange = (input, index) => {
    let temp = [...this.state.parameterMenuLabels];
    temp[index] = input;
    this.setState({ parameterMenuLabels: [...temp] })
  }

  handleDeploy = (name) => {
    let instance = {};
    let val = uuidv1();
    instance.name = name;
    instance.id = val; 
    instance.loaded = false;

    this.props.updateInstances('add',instance);
    this.props.toggleDeploy();

    //api call 
    const inputs = [...this.state.parameterMenuLabels];
    let data = {
      'service_id': this.props.service.id,
      'plan_id': '2a44ed0e-2c09-4be6-8a81-761ddba2f733'
    }
  
    axios
      .put(`http://3.86.206.101:8099/v2/service_instances/${val}`, data, {headers: {
        'Content-Type': 'application/json',
        'X-Broker-API-Version': 2.14
      }})
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
      console.log(inputs);
  }


  render() {
    const { parameterMenuLabels, plans, planLabel, name, selectedPlan } = this.state;
    const { toggleDeploy } = this.props;
    const planNames = plans.map(plan => plan.name);
    let planProperties = [];
    if (selectedPlan.hasOwnProperty('schemas')) {
      const properties = selectedPlan.schemas.service_instance.create.parameters.properties;
      for (let property in properties){
        let obj = {[property]: properties[property]};
        planProperties[properties[property].index] = obj;
      }
    }
    
    return (
      <Layer full plain onEsc={toggleDeploy} animate={false}>
        <Box direction='row' fill>
          <Box flex background={{ color: 'black', opacity: 'medium' }} />
          <Box 
            background={{ color: 'dark-1' }} 
            overflow={{ vertical: 'scroll' }}
            width='large'
            pad='small'
          >
            <Box className='deploy-form-header' direction='row' flex={false}>
              <Box justify='center' flex>
                <Button icon={<FormClose size='large' color='accent-1' />} onClick={toggleDeploy} />
              </Box>
              <Box align='center' flex>
                <Heading level='2'>Deploy Service</Heading>
              </Box>
              <Box flex /> {/*empty box to center heading*/}
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
                { this.isNotEmpty(selectedPlan) && 
                    <Box className='deploy-form-description-box'>
                      <Box>
                        <Heading level='3'><strong>Description</strong></Heading>
                      </Box>
                      <Box background={{ color: 'accent-1' }} height='2px' />
                      <Box direction='row' align='start' height='xxsmall' justify='center'>
                        <Box flex justify='center' fill='vertical'>
                          <Text size='large'>Description: </Text>
                        </Box>
                        <Box flex justify='center' align='start' fill='vertical'>
                          <Text size='large'>{selectedPlan.description}</Text>
                        </Box>
                      </Box>
                    </Box> 
                }
                { this.isNotEmpty(selectedPlan) && 
                  (!selectedPlan.free) &&
                    <Box className='prices-box'> 
                      <Box>
                        <Heading level='3'><strong>Price Options</strong></Heading>
                      </Box>
                      <Box background={{ color: 'accent-1' }} height='2px' />
                      { selectedPlan.metadata.costs.map(cost => (
                          <Box direction='row' key={cost.amount.usd} height='xxsmall'>
                            <Box flex justify='center'>
                              <Text size='large'>Price: </Text>
                            </Box>
                            <Box flex justify='center' align='start'>
                              <Text size='large'>{`$${cost.amount.usd} for ${cost.unit}`}</Text>
                            </Box>
                          </Box>
                       ))
                      }
                    </Box>
                }
                { this.isNotEmpty(selectedPlan) &&
                  (selectedPlan.free) &&
                    <Box className='prices-box'> 
                      <Box>
                        <Heading level='3'><strong>Price Options</strong></Heading>
                      </Box>
                      <Box background={{ color: 'accent-1' }} height='2px' />
                      <Box direction='row' height='xxsmall'>
                        <Box flex>
                          <Text size='large'>Price: </Text>
                        </Box>
                        <Box flex justify='center' align='start'>
                          <Text size='large'>Free</Text>
                        </Box>
                      </Box>
                    </Box>
                }
                { this.isNotEmpty(selectedPlan) &&
                  <Box className='parameters-box'> 
                    <Box>
                      <Heading level='3'><strong>Inputs</strong></Heading>
                    </Box>
                    <Box background={{ color: 'accent-1' }} height='2px' />
                    <Form>
                      <FormField label='Name'>
                        <TextInput placeholder='Name the instance' onChange={(input) => {this.setState({ name: input.target.value })} } />
                      </FormField>
                      { planProperties.map(property => {
                          const propertyName = property[Object.keys(property)[0]];
                          if (propertyName.type === 'string') {
                            return (
                                <FormField label={Object.keys(property)[0]} key={Object.keys(property)[0]}>
                                  <TextInput 
                                    plain
                                    placeholder={propertyName.description} 
                                    onChange={(input) => this.handleInputChange(input.target.value, propertyName.index)}
                                  />
                                </FormField>
                              ) 
                            } 
                            else if (propertyName.type === 'object') {
                              let label = (parameterMenuLabels !== undefined) ?
                                parameterMenuLabels[propertyName.index] :
                                '';
                              return (
                                <FormField label={Object.keys(property)[0]} key={Object.keys(property)[0]}>
                                  <Select 
                                    plain
                                    placeholder={propertyName.description} 
                                    options={propertyName.allowedValues}
                                    onChange={({ option }) => this.setParamterMenuLabel(option,propertyName.index)}
                                    value={label}
                                  />
                                </FormField>
                              )
                            }
                        })
                      }
                    </Form>
                  </Box>
                }
              </Box>
              <Form>
                <Link to='/deployed'>
                  <Button label='Deploy' icon={<Add />} minstancein={{ top: 'medium' }} onClick={() => this.handleDeploy(name)} />
                </Link>
              </Form>
            </Box>
          </Box>
        </Box>
      </Layer>
    );
  }
}

export default DeployForm;