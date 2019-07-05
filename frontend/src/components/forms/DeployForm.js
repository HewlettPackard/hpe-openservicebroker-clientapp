import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Heading, Form, FormField, TextInput } from 'grommet';


//========================================= Deploy Form
class DeployForm extends Component {
state = {
  plans: [...this.props.plans]
}

  render() {
    const { match: {params} } = this.props;

    return (
      <Box  align='center' justify="start" pad="medium" flex>
        <Heading size="medium" level="2">
          Deploy {params.name} service
        </Heading>
        <Form>
          <FormField label="Name" help="Name the instance">
            <TextInput />
          </FormField>
          
          <Link to='/catalog'>
            <Button label="Submit" margin={{ top: 'medium', left: '35%' }} />
          </Link>
        </Form>
      </Box>
    );
  }
}

export default DeployForm;