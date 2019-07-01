import React, { Component } from "react";
import { Box, Button } from "grommet";
import { LinkPrevious } from "grommet-icons";
import LogoAndTitle from "../Logo-Title/LogoTitle";
import PropTypes from "prop-types";


//========================================= AppBar
class AppBar extends Component {
	static propTypes = {
		text: PropTypes.string.isRequired
	};

	render() {
		return (
			<Box
				tag="header"
				direction="column"
				align="start"
				justify="center"
				height="xmall"
				pad={{ left: "small", top: "small" }}
				flex="false"
			>
				<Button
					plain
					color="brand"
					label="Catalog"
					gap="xsmall"
					icon={<LinkPrevious size="medium" color="brand" />}
				/>
				<LogoAndTitle text={this.props.text} />
			</Box>
		);
	}
}

export default AppBar;
