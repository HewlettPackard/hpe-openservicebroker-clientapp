import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Text, TextInput } from "grommet";
import { Sync } from "grommet-icons";
import Card from "../services-card/Card";
import DeployForm from "../deploy/DeployForm";
import axios from "axios";

//========================================= Catalog Results
class CatalogResults extends Component {
	state = {
		deployFormOpen: false,
		notYetSearched: true,
		value: "",
		serviceList: [],
		showList: [],
		service: {}
	};

	//update the serviceList by calling the API
	componentDidMount() {
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

	search = (value, listToSearch) => {
		let tempList = [];

		if (value === "" && this.state.notYetSearched) return [];
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
				notYetSearched: false,
				showList: [...tempList]
			});
		}
	};

	toggleDeploy = service => {
		this.setState({
			deployFormOpen: !this.state.deployFormOpen,
			service: service
		});
	};

	render() {
		const {
			deployFormOpen,
			service,
			serviceList,
			showList,
			value
		} = this.state;
		const { updateInstances } = this.props;
		let showEmptyMessage = false;
		if (serviceList.length === 0) showEmptyMessage = true;

		return (
			<Box pad="large" fill>
				{showEmptyMessage && (
					<Box className="empty-catalog-message" align="center" gap="medium">
						<Text size="xlarge" color="">
							You do not have any brokers registered. Register a broker to
							access services.
						</Text>
						<Link to="/settings" style={{ color: "#01a982" }}>
							<Text size="large" color="brand">
								Register Broker
							</Text>
						</Link>
					</Box>
				)}
				{!showEmptyMessage && (
					<Box gap="large">
						<Box
							className="search-area"
							alignSelf="center"
							direction="row"
							gap="small"
						>
							<Box width="medium" border={{ size: "xsmall", color: "light-5" }}>
								<TextInput
									placeholder="search"
									value={value}
									onChange={this.setValue}
								/>
							</Box>
							<Button
								label="refresh"
								color="brand"
								gap="small"
								icon={<Sync size="medium" color="brand" />}
								onClick={() => {
									alert("Udating Services");
									this.setState({});
								}}
							/>
						</Box>
						<Grid gap="large" columns="small" rows="small">
							{showList.map(service => (
								<Card
									service={service}
									key={service.name}
									toggleDeploy={this.toggleDeploy}
								/>
							))}
						</Grid>
					</Box>
				)}
				{deployFormOpen && (
					<DeployForm
						toggleDeploy={this.toggleDeploy}
						service={service}
						updateInstances={updateInstances}
					/>
				)}
			</Box>
		);
	}
}

export default CatalogResults;
