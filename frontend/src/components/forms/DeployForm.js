import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Form, FormField, Heading, Select, Text, TextInput, SkipLinkTarget } from 'grommet';


//========================================= Deploy Form
class DeployForm extends Component {
  state = {
    parameterMenuLabels: [],
    plans: [...this.props.location.state.service.plans],
    planLabel: '',
    selectedPlan: {},
    successfullyDeployed: false
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

handleDeploy = () => {
  const inputs = [...this.state.parameterMenuLabels];
  //api call 
  const success = true;
  this.setState({ successfullyDeployed: success });
}


  render() {
    const { parameterMenuLabels, plans, planLabel, selectedPlan, successfullyDeployed } = this.state;
    const service = this.props.location.state.service;
    const planNames = plans.map(plan => plan.name);
    let planProperties = [];
    if (this.isNotEmpty(selectedPlan)) 
    if (selectedPlan.hasOwnProperty('schemas')) 
    for (let property in selectedPlan.schemas.service_instance.create.parameters.properties){
      let obj = {[property]: selectedPlan.schemas.service_instance.create.parameters.properties[property]};
      planProperties[selectedPlan.schemas.service_instance.create.parameters.properties[property].index] = obj;
    }
    
    return (
      <Box align='center' justify="start" pad="medium" flex>
        <Heading size="medium" level="2">
          Deploy {service.name} service
        </Heading>
        <Form>
          <FormField label="Name" help="Name the instance">
            <TextInput />
          </FormField>
          <Select
            placeholder='select plan'
            value={planLabel}
            onChange={({ option }) => this.setPlanMenuLabel(option)}
            options={[...planNames]}
            margin='medium'
          />
        </Form>
        <Box gap='medium' width='large' pad={{ bottom: 'medium' }}>
          { this.isNotEmpty(selectedPlan) && 
              <Box className='description-box'>
                <Box align='start'>
                  <Heading level='3'><strong>Description: </strong></Heading>
                </Box>
                <Box background={{ color: 'accent-1' }} height='2px' />
                <Box direction='row' align='start'>
                  <Box flex>
                    <Text size='large'>Description: </Text>
                  </Box>
                  <Box flex justify='center' align='start'>
                    <Text size='large'>{selectedPlan.description}</Text>
                  </Box>
                </Box>
              </Box> 
          }
          { this.isNotEmpty(selectedPlan) && 
            (selectedPlan.free === false) &&
            <Box className='prices-box'> 
              <Box>
                <Heading level='3'><strong>Price Options: </strong></Heading>
              </Box>
              <Box background={{ color: 'accent-1' }} height='2px' />
              {selectedPlan.metadata.costs.map(cost => (
                <Box direction='row' key={cost.amount.usd}>
                  <Box flex>
                    <Text size='large'>Price: </Text>
                  </Box>
                  <Box flex justify='center' align='start'>
                    <Text size='large'>{`$${cost.amount.usd} for ${cost.unit}`}</Text>
                  </Box>
                </Box>
              ))}
            </Box>
          }
          { this.isNotEmpty(selectedPlan) &&
             (selectedPlan.free === true) &&
            <Box className='prices-box'> 
              <Box>
                <Heading level='3'><strong>Price Options: </strong></Heading>
              </Box>
              <Box background={{ color: 'accent-1' }} height='2px' />
              <Box direction='row'>
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
                <Heading level='3'><strong>Inputs: </strong></Heading>
              </Box>
              <Box background={{ color: 'accent-1' }} height='2px' />
              { planProperties.map(property => {
                const propertyName = property[Object.keys(property)[0]];
                if (propertyName.type === 'string')
                  return (
                    <Box direction='row' key={Object.keys(property)[0]} height='30px'>
                      <Box flex>
                        <Text size='large'>{Object.keys(property)[0]}: </Text>
                      </Box>
                      <Box flex justify='center' align='start'>
                        <FormField>
                          <TextInput 
                            placeholder={propertyName.description} 
                            onChange={(input) => this.handleInputChange(input.target.value, propertyName.index)}
                          />
                        </FormField>
                      </Box>
                    </Box>
                  ) 
                else if (propertyName.type === 'object') {
                  let label = (parameterMenuLabels !== undefined) ?
                    parameterMenuLabels[propertyName.index] :
                    '';
                  return (
                    <Box direction='row' key={Object.keys(property)[0]}>
                      <Box flex>
                        <Text size='large'>{Object.keys(property)[0]}: </Text>
                      </Box>
                      <Box flex justify='center' align='start'>
                        <FormField>
                          <Select 
                            placeholder={propertyName.description} 
                            options={propertyName.allowedValues}
                            onChange={({ option }) => this.setParamterMenuLabel(option,propertyName.index)}
                            value={label}
                          />
                        </FormField>
                      </Box>
                    </Box>
                  )}
              })}
            </Box>
          }
        </Box>
        <Form>
          <Link to='/catalog'>
            <Button label='Deploy' margin={{ top: 'medium' }} onClick={this.handleDeploy} />
          </Link>
        </Form>
        {console.log('menu labels', parameterMenuLabels)}
      </Box>
    );
  }
}

export default DeployForm;