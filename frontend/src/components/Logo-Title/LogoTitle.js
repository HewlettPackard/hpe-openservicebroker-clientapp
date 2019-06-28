import React, { Component } from "react";
import { Box, Heading } from "grommet";
import PropTypes from "prop-types";
import { Hpe } from "grommet-icons";

class LogoAndTitle extends Component {
	static propTypes = {
		text: PropTypes.string.isRequired
	};

	render() {
		return (
			<Box margin={{ vertical: "small", horizontal: "medium" }}>
				<Box>
					<Hpe color="brand" size="large" margi={{ vertical: "large" }} />
				</Box>
				<Box margin={{ top: "-10px" }}>
					<Heading color="black" size="medium" margin={{ vertical: "none" }}>
						{this.props.text}
					</Heading>
				</Box>
			</Box>
		);
	}
}

export default LogoAndTitle;
