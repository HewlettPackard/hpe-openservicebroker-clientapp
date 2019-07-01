import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "grommet";
import { LinkPrevious } from "grommet-icons";
import LogoAndTitle from "../logo-title/LogoTitle";
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
				<Link to='/'>
					<Button
						plain
						color="brand"
						label="Catalog"
						gap="xsmall"
						icon={<LinkPrevious size="medium" color="brand" />}
					/>
				</Link>
				<LogoAndTitle text={this.props.text} />
			</Box>
		);
	}
}

export default AppBar;
