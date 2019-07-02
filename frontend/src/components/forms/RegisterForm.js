import React, { Component } from "react";
import { Box, Button, Form, FormField, Heading } from "grommet";


//========================================= Register Form
class RegisterForm extends Component {
    render() {
        return (
            <Box align="center" justify="center" pad="medium">
                <Form>
                    <Heading size="medium" level="2">
                        Register service
                    </Heading>
                    <FormField label="Name" help="Name of the service" />
                    <FormField
                        label="URL"
                        help="Use https for secure connection. For eg - https://127.0.0.1:7009"
                    />
                    <FormField label="Username" help="Username used to login to broker" />
                    <FormField label="Password" />
                    <Button label="Submit" />
                </Form>
            </Box>
        );
    }
}

export default RegisterForm;