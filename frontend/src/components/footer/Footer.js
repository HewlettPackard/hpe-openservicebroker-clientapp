import React from "react";
import { Box, Text } from "grommet";
import { Hpe } from "grommet-icons";

//========================================= Footer
const Footer = () => (
	<Box
		fill="horizontal"
    background={{ color: "light-3" }}
    border={{ color: "white", side: 'left' }}
		height="50px"
		direction="row"
		align="center"
		justify='center'
		gap="large"
    pad={{ horizontal: "large" }}
    flex={false}
	>
		<Box direction="row" gap="small" align="center">
			<Hpe color="brand" size="medium" />
			<Text size="large" color="brand">
				Hewlett Packard Enterprise
			</Text>
		</Box>
	</Box>
);

export default Footer;
