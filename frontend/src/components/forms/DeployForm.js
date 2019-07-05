import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Heading, Form, FormField, Select, TextInput } from 'grommet';


//========================================= Deploy Form
class DeployForm extends Component {
  state = {
    plans: [...this.props.plans],
    planLabel: ''
  }

  setValue = (value) => {
    this.setState({ planLabel: value });
  }

  render() {
    const { match: {params} } = this.props;
    const { plans, planLabel } = this.state;
    const planNames = plans.map(plan => plan.name);

    return (
      <Box  align='center' justify="start" pad="medium" flex>
        <Heading size="medium" level="2">
          Deploy {params.name} service
        </Heading>
        <Form>
          <FormField label="Name" help="Name the instance">
            <TextInput />
          </FormField>
          <Select
            placeholder='select plan'
            value={planLabel}
            onChange={({ option }) => this.setValue(option)}
            options={[...planNames]}
          />
          <Link to='/catalog'>
            <Button label="Submit" margin={{ top: 'medium', left: '35%' }} />
          </Link>
        </Form>
      </Box>
    );
  }
}

export default DeployForm;