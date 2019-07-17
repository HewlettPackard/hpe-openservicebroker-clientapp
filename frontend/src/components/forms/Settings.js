import React, { Component } from "react";
import { Box, Grid, Button, Text } from "grommet";
import { Add } from "grommet-icons";
import axios from "axios";
import BrokerCard from "../broker-card/BrokerCard";
import BrokerDetail from "../broker-detail/BrokerDetail";

class Settings extends Component {
	state = {
		brokerList: [
			{
				name: "Broker 1",
				id: "1",
				description: "Some broker"
			},
			{
				name: "Broker 2",
				id: "2",
				description: "Some broker"
			}
    ],
    broker: {},
    detailsOpen: false,
		hovering: false,
    borderColor: "light-5"
	};

	setBorder = () => {
		if (!this.state.hovering)
			this.setState({ borderColor: "accent-1", hovering: true });
		else this.setState({ borderColor: "light-5", hovering: false });
  };
  
  toggleDetails = (broker) => {
    this.setState({ detailsOpen: !this.state.detailsOpen, broker: broker });
  }


	render() {
    const { detailsOpen, broker } = this.state;;

		return (
			<Box pad='large' fill>
				<Grid gap="large" columns="small" rows="small">
					{ this.state.brokerList.map(broker => (
						  <BrokerCard broker={broker} toggleDetails={this.toggleDetails} />
            ))
          }
          <Box
            elevation="medium"
            background={{ color: "white" }}
            border={{ color: this.state.borderColor }}
            round="xsmall"
            width="small"
            height="small"
            onMouseOver={this.setBorder}
            onMouseOut={this.setBorder}
          >
            <Box height='40%' fill='horizontal' pad='medium' align='center'>
              <Text size="38px" color="brand">
                Register
              </Text>
            </Box>
            <Box flex fill='horizontal' pad='medium' align='center' justify='start'>
              <Button icon={<Add size="medium" color='brand' />} />
            </Box>
          </Box>
				</Grid>
        { detailsOpen && 
            <BrokerDetail toggleDetails={this.toggleDetails} broker={broker} />
        }
			</Box>
		);
	}
}

export default Settings;
