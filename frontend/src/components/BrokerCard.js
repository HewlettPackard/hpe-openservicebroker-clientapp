import React, { Component } from "react";
import { Box, Button, Text } from "grommet";
import { More } from "grommet-icons";
class BrokerCard extends Component {
	state = {
		borderColor: "light-5",
		hovering: false
	};
	setBorder = () => {
		if (!this.state.hovering)
			this.setState({ borderColor: "accent-1", hovering: true });
		else this.setState({ borderColor: "light-5", hovering: false });
	};

	toggle = () => {
		this.setState({ hovering: false });
	};

	handleClick = id => {
		this.toggle();
		console.log(`${id} clicked!`);
	};

	handleBoxClick() {
		console.log("Box clicked!");
	}
	render() {
		const { borderColor } = this.state;
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
				onMouseOver={this.setBorder}
				onMouseOut={this.setBorder}
				style={{ cursor: "pointer" }}
			>
				<Box onClick={this.handleClick} flex>
					<Box flex fill="horizontal" justify="center" align="center">
						<Text size="38px" color="brand" truncate>
							{this.props.brokerName}
						</Text>
					</Box>
					<Box
						flex
						fill="horizontal"
						justify="start"
						align="start"
						overflow={{ horizontal: "scroll" }}
					>
						<Text size="large">{this.props.brokerDesc}</Text>
					</Box>
				</Box>
				<Box fill="horizontal">
					<Button
						label="Details"
						icon={<More />}
						plain
						primary
						// focusIndicator={true}
						// hoverIndicator={true}
						onClick={() => this.handleClick(this.props.brokerId)}
						color="light-3"
					/>
				</Box>
			</Box>
		);
	}
}

export default BrokerCard;
