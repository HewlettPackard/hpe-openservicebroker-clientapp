import React, { Component } from "react";
import { Box, Button, Text } from "grommet";
import { More } from "grommet-icons";


//========================================= Broker Card
class BrokerCard extends Component {
	state = {
		borderColor: "light-5"
  };
  
  setBorder = (color) => {
    this.setState({ borderColor: color });
  }


	render() {
    const { borderColor } = this.state;
    const { broker, toggleDetails } = this.props;
		return (
			<Box
				elevation="medium"
				background={{ color: "white" }}
				border={{ color: borderColor }}
				round="xsmall"
				justify="start"
				align="center"
				width="small"
				height="small"
				onMouseOver={() => this.setBorder('accent-1')}
        onMouseOut={() => this.setBorder('light-5')}
        onClick={() => toggleDetails(broker)}
				style={{ cursor: "pointer" }}
			>
				<Box onClick={this.handleClick} flex>
					<Box flex fill="horizontal" justify="center" align="center">
						<Text size="38px" color="brand" truncate>
							{broker.name}
						</Text>
					</Box>
					<Box
						flex
						fill="horizontal"
						justify="start"
						align="start"
						overflow={{ horizontal: "scroll" }}
					>
						<Text size="large">{broker.description}</Text>
					</Box>
				</Box>
				<Box fill="horizontal">
					<Button
						label="Details"
						icon={<More />}
						plain
						primary
						color="light-3"
					/>
				</Box>
			</Box>
		);
	}
}

export default BrokerCard;
