import React, { Component } from "react";
import { Box, Grid, Button, Text } from "grommet";
import { Add } from "grommet-icons";
import axios from "axios";
import BrokerCard from "../BrokerCard";

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
		borderColor: "light-5",
		hovering: false
	};

	setBorder = () => {
		if (!this.state.hovering)
			this.setState({ borderColor: "accent-1", hovering: true });
		else this.setState({ borderColor: "light-5", hovering: false });
	};
	render() {
		return (
			<Box fill>
				<Box>
					<Box fill="horizontal" flex={false}>
						{/* <Box
							width="70%"
							alignSelf="center"
							margin={{ bottom: "large" }}
							border={{ size: "xsmall", color: "light-5" }}
						/> */}
					</Box>
				</Box>
				<Grid gap="large" columns="small" rows="small">
					{this.state.brokerList.map(broker => (
						<BrokerCard
							brokerName={broker.name}
							brokerDesc={broker.description}
							brokerId={broker.id}
						/>
					))}
				</Grid>
				<Box
					elevation="medium"
					background={{ color: "white" }}
					border={{ color: this.state.borderColor }}
					round="xsmall"
					justify="center"
					align="center"
					width="small"
					height="small"
					onMouseOver={this.setBorder}
					onMouseOut={this.setBorder}
					margin={{ top: "30px" }}
				>
					<Button
						plain
						label={
							<Text size="38px" color="brand">
								Register
							</Text>
						}
						hoverIndicator={true}
						icon={<Add size="medium" />}
					/>
				</Box>
			</Box>
		);
	}
}

export default Settings;
