import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Button, Grid, Layer, Heading, Text } from 'grommet';
import { FormClose } from 'grommet-icons';
import Card from '../card/Card';
import DeployedDetail from '../deployed-detail/DeployedDetail';
import axios from 'axios';



const deploymentsObject = {
  "services": [
      {
          "name": "grommet1",
          "tags": [
              "ui",
              "grommet"
          ],
          "plan_updateable": true,
          "bindable": true,
          "plans": [
              {
                  "description": "Grommet-plan-1",
                  "free": false,
                  "name": "grommet-plan-1",
                  "schemas": {
                      "service_binding": {
                          "create": {
                              "parameters": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "properties": {
                                      "Ubuntu_URL": {
                                          "type": "string",
                                          "description": "specify the ubuntu url."
                                      }
                                  }
                              }
                          }
                      },
                      "service_instance": {
                          "create": {
                              "parameters": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "properties": {
                                      "NodeJS_version": {
                                          "index": 5,
                                          "type": "object",
                                          "description": "select the nodejs version.",
                                          "allowedValues": [
                                              "10.15.3",
                                              "12.1.0"
                                          ]
                                      },
                                      "region": {
                                          "index": 0,
                                          "type": "string",
                                          "description": "specify the aws region."
                                      },
                                      "Secret_Access_Key": {
                                          "index": 2,
                                          "type": "string",
                                          "description": "specify the aws account Secret Access Key."
                                      },
                                      "Image_ID": {
                                          "index": 3,
                                          "type": "string",
                                          "description": "ID of AMI to launch, such as 'ami-XXXX'"
                                      },
                                      "Access_Key_ID": {
                                          "index": 1,
                                          "type": "string",
                                          "description": "specify the aws account Access Key ID."
                                      },
                                      "Flavor": {
                                          "index": 4,
                                          "type": "object",
                                          "description": "Select the instance type",
                                          "allowedValues": [
                                              "t2.micro",
                                              "t2.small"
                                          ]
                                      }
                                  }
                              }
                          },
                          "update": {
                              "parameters": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "properties": {
                                      "Ubuntu_URL": {
                                          "type": "string",
                                          "description": "specify the ubuntu url."
                                      }
                                  }
                              }
                          }
                      }
                  },
                  "id": "2a44ed0e-2c09-4be6-8a81-761ddba2f733",
                  "metadata": {
                      "costs": [
                          {
                              "amount": {
                                  "usd": 99.0
                              },
                              "unit": "MONTHLY"
                          },
                          {
                              "amount": {
                                  "usd": 0.99
                              },
                              "unit": "1GB of messages over 20GB"
                          }
                      ],
                      "bullets": [
                          "Shared fake server",
                          "5 TB storage",
                          "40 concurrent connections"
                      ],
                      "max_storage_tb": 5
                  }
              },
              {
                  "description": "grommet-plan-2",
                  "metadata": {
                      "costs": [
                          {
                              "amount": {
                                  "usd": 199.0
                              },
                              "unit": "MONTHLY"
                          },
                          {
                              "amount": {
                                  "usd": 0.99
                              },
                              "unit": "1GB of messages over 20GB"
                          }
                      ],
                      "bullets": [
                          "40 concurrent connections"
                      ],
                      "max_storage_tb": 5
                  },
                  "name": "grommet-plan-2",
                  "free": false,
                  "id": "e3c4f66b-b7ae-4f64-b5a3-51c910b19ac0"
              }
          ],
          "metadata": {
              "listing": {
                  "imageUrl": "http://example.com/cat.gif",
                  "blurb": "Add a blurb here",
                  "longDescription": "UI component library, in a galaxy far far away..."
              },
              "displayName": "The Grommet Broker",
              "provider": {
                  "name": "The grommet"
              }
          },
          "requires": [
              "route_forwarding"
          ],
          "id": "97ca7e25-8f63-44a7-99d1-a75729ebfb5e",
          "dashboard_client": {
              "secret": "277cabb0-XXXX-XXXX-XXXX-7822c0a90e5d",
              "redirect_uri": "http://localhost:1234",
              "id": "7cc087aa-e978-4e66-9e3f-820024d05868"
          },
          "description": "grommet service for grommet1"
      },
      {
          "name": "grommet2",
          "tags": [
              "ui",
              "grommet"
          ],
          "plan_updateable": true,
          "bindable": true,
          "plans": [
              {
                  "description": "Grommet-plan-1",
                  "free": false,
                  "name": "grommet-plan-1",
                  "schemas": {
                      "service_binding": {
                          "create": {
                              "parameters": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "properties": {
                                      "Ubuntu_URL": {
                                          "type": "string",
                                          "description": "specify the ubuntu url."
                                      }
                                  }
                              }
                          }
                      },
                      "service_instance": {
                          "create": {
                              "parameters": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "properties": {
                                      "NodeJS_version": {
                                          "index": 5,
                                          "type": "object",
                                          "description": "select the nodejs version.",
                                          "allowedValues": [
                                              "10.15.3",
                                              "12.1.0"
                                          ]
                                      },
                                      "region": {
                                          "index": 0,
                                          "type": "string",
                                          "description": "specify the aws region."
                                      },
                                      "Secret_Access_Key": {
                                          "index": 2,
                                          "type": "string",
                                          "description": "specify the aws account Secret Access Key."
                                      },
                                      "Image_ID": {
                                          "index": 3,
                                          "type": "string",
                                          "description": "ID of AMI to launch, such as 'ami-XXXX'"
                                      },
                                      "Access_Key_ID": {
                                          "index": 1,
                                          "type": "string",
                                          "description": "specify the aws account Access Key ID."
                                      },
                                      "Flavor": {
                                          "index": 4,
                                          "type": "object",
                                          "description": "Select the instance type",
                                          "allowedValues": [
                                              "t2.micro",
                                              "t2.small"
                                          ]
                                      }
                                  }
                              }
                          },
                          "update": {
                              "parameters": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "properties": {
                                      "Ubuntu_URL": {
                                          "type": "string",
                                          "description": "specify the ubuntu url."
                                      }
                                  }
                              }
                          }
                      }
                  },
                  "id": "2a44ed0e-2c09-4be6-8a81-761ddba2f733",
                  "metadata": {
                      "costs": [
                          {
                              "amount": {
                                  "usd": 99.0
                              },
                              "unit": "MONTHLY"
                          },
                          {
                              "amount": {
                                  "usd": 0.99
                              },
                              "unit": "1GB of messages over 20GB"
                          }
                      ],
                      "bullets": [
                          "Shared fake server",
                          "5 TB storage",
                          "40 concurrent connections"
                      ],
                      "max_storage_tb": 5
                  }
              },
              {
                  "description": "grommet-plan-2",
                  "metadata": {
                      "costs": [
                          {
                              "amount": {
                                  "usd": 199.0
                              },
                              "unit": "MONTHLY"
                          },
                          {
                              "amount": {
                                  "usd": 0.99
                              },
                              "unit": "1GB of messages over 20GB"
                          }
                      ],
                      "bullets": [
                          "40 concurrent connections"
                      ],
                      "max_storage_tb": 5
                  },
                  "name": "grommet-plan-2",
                  "free": false,
                  "id": "e3c4f66b-b7ae-4f64-b5a3-51c910b19ac0"
              }
          ],
          "metadata": {
              "listing": {
                  "imageUrl": "http://example.com/cat.gif",
                  "blurb": "Add a blurb here",
                  "longDescription": "UI component library, in a galaxy far far away..."
              },
              "displayName": "The Grommet Broker",
              "provider": {
                  "name": "The grommet"
              }
          },
          "requires": [
              "route_forwarding"
          ],
          "id": "97ca7e25-8f63-44a7-99d1-a75729ebfb5e",
          "dashboard_client": {
              "secret": "277cabb0-XXXX-XXXX-XXXX-7822c0a90e5d",
              "redirect_uri": "http://localhost:1234",
              "id": "7cc087aa-e978-4e66-9e3f-820024d05868"
          },
          "description": "grommet service for grommet2"
      },
      {
          "name": "grommet3",
          "tags": [
              "ui",
              "grommet"
          ],
          "plan_updateable": true,
          "bindable": true,
          "plans": [
              {
                  "description": "Grommet-plan-1",
                  "free": false,
                  "name": "grommet-plan-1",
                  "schemas": {
                      "service_binding": {
                          "create": {
                              "parameters": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "properties": {
                                      "Ubuntu_URL": {
                                          "type": "string",
                                          "description": "specify the ubuntu url."
                                      }
                                  }
                              }
                          }
                      },
                      "service_instance": {
                          "create": {
                              "parameters": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "properties": {
                                      "NodeJS_version": {
                                          "index": 5,
                                          "type": "object",
                                          "description": "select the nodejs version.",
                                          "allowedValues": [
                                              "10.15.3",
                                              "12.1.0"
                                          ]
                                      },
                                      "region": {
                                          "index": 0,
                                          "type": "string",
                                          "description": "specify the aws region."
                                      },
                                      "Secret_Access_Key": {
                                          "index": 2,
                                          "type": "string",
                                          "description": "specify the aws account Secret Access Key."
                                      },
                                      "Image_ID": {
                                          "index": 3,
                                          "type": "string",
                                          "description": "ID of AMI to launch, such as 'ami-XXXX'"
                                      },
                                      "Access_Key_ID": {
                                          "index": 1,
                                          "type": "string",
                                          "description": "specify the aws account Access Key ID."
                                      },
                                      "Flavor": {
                                          "index": 4,
                                          "type": "object",
                                          "description": "Select the instance type",
                                          "allowedValues": [
                                              "t2.micro",
                                              "t2.small"
                                          ]
                                      }
                                  }
                              }
                          },
                          "update": {
                              "parameters": {
                                  "$schema": "http://json-schema.org/draft-04/schema#",
                                  "type": "object",
                                  "properties": {
                                      "Ubuntu_URL": {
                                          "type": "string",
                                          "description": "specify the ubuntu url."
                                      }
                                  }
                              }
                          }
                      }
                  },
                  "id": "2a44ed0e-2c09-4be6-8a81-761ddba2f733",
                  "metadata": {
                      "costs": [
                          {
                              "amount": {
                                  "usd": 99.0
                              },
                              "unit": "MONTHLY"
                          },
                          {
                              "amount": {
                                  "usd": 0.99
                              },
                              "unit": "1GB of messages over 20GB"
                          }
                      ],
                      "bullets": [
                          "Shared fake server",
                          "5 TB storage",
                          "40 concurrent connections"
                      ],
                      "max_storage_tb": 5
                  }
              },
              {
                  "description": "grommet-plan-2",
                  "metadata": {
                      "costs": [
                          {
                              "amount": {
                                  "usd": 199.0
                              },
                              "unit": "MONTHLY"
                          },
                          {
                              "amount": {
                                  "usd": 0.99
                              },
                              "unit": "1GB of messages over 20GB"
                          }
                      ],
                      "bullets": [
                          "40 concurrent connections"
                      ],
                      "max_storage_tb": 5
                  },
                  "name": "grommet-plan-2",
                  "free": false,
                  "id": "e3c4f66b-b7ae-4f64-b5a3-51c910b19ac0"
              }
          ],
          "metadata": {
              "listing": {
                  "imageUrl": "http://example.com/cat.gif",
                  "blurb": "Add a blurb here",
                  "longDescription": "UI component library, in a galaxy far far away..."
              },
              "displayName": "The Grommet Broker",
              "provider": {
                  "name": "The grommet"
              }
          },
          "requires": [
              "route_forwarding"
          ],
          "id": "97ca7e25-8f63-44a7-99d1-a75729ebfb5e",
          "dashboard_client": {
              "secret": "277cabb0-XXXX-XXXX-XXXX-7822c0a90e5d",
              "redirect_uri": "http://localhost:1234",
              "id": "7cc087aa-e978-4e66-9e3f-820024d05868"
          },
          "description": "grommet service for grommet3"
      }
  ]
}


//========================================= Deployed List
export default class Deployments extends Component {
  state = {
    instance: {},
    deployments: [...deploymentsObject.services],
    detailsOpen: false
  };

  handleDelete = () => {

  }

  toggleDetails = (instance) => {
    console.log('instance', instance)
    this.setState({ detailsShowing: !this.state.detailsShowing, instance: instance });
  }


  render() {
    const { deployments, detailsShowing, instance } = this.state;;

    return (
      <Box pad='large'>
        <Grid gap='large' columns='small' rows='small'>
          {deployments.map(instance => 
            <Card instance={instance} fromDeployed toggleDetails={this.toggleDetails} key={instance.name} />
          )}
        </Grid>
        { detailsShowing && 
            <DeployedDetail toggleDetails={this.toggleDetails} instance={instance} />
        }
      </Box>
    );
  }
}