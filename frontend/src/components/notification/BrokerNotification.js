// import React, { Component } from "react";
// import { Add, FormClose, StatusGood } from "grommet-icons";
// import { Box, Button, Grommet, Layer, Text } from "grommet";
// import { grommet } from "grommet/themes";

// class NotificationLayer extends Component {
// 	state = {};

// 	onOpen = () => this.setState({ open: true });

// 	onClose = () => this.setState({ open: undefined });

// 	render() {
// 		const { open } = this.state;
// 		return (
// 			<Grommet theme={grommet} full>
// 				<Box fill align="center" justify="center">
// 					<Button
// 						icon={<Add color="brand" />}
// 						label={
// 							<Text>
// 								<strong>Add</strong>
// 							</Text>
// 						}
// 						onClick={this.onOpen}
// 						plain
// 					/>
// 				</Box>
// 				{open && (
// 					<Layer
// 						position="bottom"
// 						modal={false}
// 						margin={{ vertical: "medium", horizontal: "small" }}
// 						onEsc={this.onClose}
// 						responsive={false}
// 						plain
// 					>
// 						<Box
// 							align="center"
// 							direction="row"
// 							gap="small"
// 							justify="between"
// 							round="medium"
// 							elevation="medium"
// 							pad={{ vertical: "xsmall", horizontal: "small" }}
// 							background="status-ok"
// 						>
// 							<Box align="center" direction="row" gap="xsmall">
// 								<StatusGood />
// 								<Text>A new broker has been registered</Text>
// 							</Box>
// 							<Button icon={<FormClose />} onClick={this.onClose} plain />
// 						</Box>
// 					</Layer>
// 				)}
// 			</Grommet>
// 		);
// 	}
// }

// export default NotificationLayer;
