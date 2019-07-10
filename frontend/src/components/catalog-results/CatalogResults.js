import React, { Component } from "react";
import { Box, Button, Grid, TextInput } from "grommet";
import { Sync } from "grommet-icons";
import Card from "../card/Card";
import axios from "axios";

//========================================= Catalog Results
class CatalogResults extends Component {
	state = {
		value: "",
		notYetUpdated: true,
		serviceList: [],
		showList: []
	};

	//update the serviceList by calling the API
	update() {
		axios
			.get("http://3.86.206.101:8099/v2/catalog")
			.then(results => {
				this.setState({
					serviceList: [...results.data.services],
					showList: [...results.data.services]
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	//update catalog on page render
	componentDidMount() {
		this.update();
	}

	handleUpdate() {
		this.setState({ state: this.state });
	}

	search = (value, listToSearch) => {
		let tempList = [];

		if (value === "" && this.state.notYetUpdated) return [];
		else {
			listToSearch.forEach(service => {
				if (service.name.search(value) !== -1) tempList.push(service);
			});
			return tempList;
		}
	};

	setValue = event => {
		if (
			event.target.value.search(
				/[a-z]?(\\|!|@|#|\$|%|\^|&|\*|\(|\)|-|\+)+/i
			) !== -1
		)
			return;
		else {
			const tempList = this.search(event.target.value, this.state.serviceList);
			this.setState({
				value: event.target.value,
				notYetUpdated: false,
				showList: [...tempList]
			});
		}
	};

	render() {
		const { showList, value } = this.state;

		return (
			<Box fill>
				<Box fill="horizontal" flex={false}>
					<Box
						width="70%"
						alignSelf="center"
						margin={{ bottom: "large" }}
						border={{ size: "xsmall", color: "light-5" }}
					>
						<TextInput
							placeholder="search"
							value={value}
							onChange={this.setValue}
						/>
					</Box>
				</Box>
				<Grid gap="large" columns="small" rows="small">
					{showList.map(service => (
						<Card service={service} key={service.name} />
					))}
				</Grid>
				<Box
					width="medium"
					align="center"
					justify="center"
					alignSelf="center"
					margin={{ top: "30px" }}
				>
					<Button
						fill
						color="brand"
						label="Update Catalog"
						gap="small"
						icon={<Sync size="medium" color="brand" />}
						onClick={() => {
							alert("Udating Services");
							this.update();
						}}
					/>
				</Box>
			</Box>
		);
	}
}

export default CatalogResults;
