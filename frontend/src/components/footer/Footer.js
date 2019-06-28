import React from "react";
import { Box, Text } from "grommet";
import { Hpe } from "grommet-icons";
const Footer = () => (
	<Box
		fill="horizontal"
		background={{ color: "neutral-1" }}
		height="xsmall"
		direction="row"
		align="center"
		gap="large"
		pad={{ horizontal: "large" }}
	>
		<Hpe color="brand" size="medium" />
		<Text color="brand">Hewlett-Packard Enterprise</Text>
	</Box>
);

export default Footer;
