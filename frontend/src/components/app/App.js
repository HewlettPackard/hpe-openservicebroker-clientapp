import React, { Component } from "react";
import { Box, Grommet } from "grommet";
import { hpe } from "grommet-theme-hpe";
import AppBar from "../app-bar/AppBar";
import Footer from "../footer/Footer";
import "../app/App.css";

export default class App extends Component {
	render() {
		return (
			<Grommet theme={hpe} full>
				<Box fill>
					<AppBar text="Heading here" />
					<Box
						className="main-content"
						flex
						background={{ color: "light-1" }}
						pad={{ horizontal: "large", vertical: "medium" }}
					>
						content here
					</Box>
					<Footer />
				</Box>
			</Grommet>
		);
	}
}
