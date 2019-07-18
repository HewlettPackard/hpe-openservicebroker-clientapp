import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Text } from "grommet";
import Card from "../services-card/Card";
import DeployedDetail from "../deployed-detail/DeployedDetail";
import axios from "axios";

//========================================= Deployed List
export default class Deployments extends Component {
	state = {
		instance: {},
		detailsOpen: false
	};

	handleDelete = () => {};

	toggleDetails = instance => {
		this.setState({ detailsOpen: !this.state.detailsOpen, instance: instance });
	};

	timer = {};

	componentDidMount() {
		const { instances } = this.props;
		for (let i = 0; i < instances.length; i++)
			if (instances[i].status === 'loading') {
				this.timer = setInterval(() => {
					axios
						.get(
							`http://3.86.206.101:8099/v2/service_instances/${
								instances[i].id
							}/last_operation`
						)
						.then(result => {
							if (result.data.state === "succeeded")
								this.props.updateInstances("loaded", instances[i]);
						})
						.catch(error => {
							console.log(error);
						});
				}, 5000);
			}
	}

	componentDidUpdate() {
		clearInterval(this.timer);
	}

	render() {
		const { detailsOpen, instance } = this.state;
		const { instances } = this.props;

		return (
			<Box pad="large" fill>
				{instances.length > 0 && (
					<Grid gap="large" columns="small" rows="small">
						{instances.map(instance => (
							<Card
								instance={instance}
								fromDeployed
								toggleDetails={this.toggleDetails}
								key={instance.name}
							/>
						))}
					</Grid>
				)}
				{instances.length === 0 && (
					<Box
						className="empty-deployed-list-message"
						align="center"
						gap="medium"
					>
						<Text size="xlarge" color="">
							You do not have any deployed services. Deploy a service in the
							catalog.
						</Text>
						<Link to="/catalog" style={{ color: "#01a982" }}>
							<Text size="large" color="brand">
								Catalog
							</Text>
						</Link>
					</Box>
				)}
				{detailsOpen && (
					<DeployedDetail
						toggleDetails={this.toggleDetails}
						instance={instance}
						updateInstances={this.props.updateInstances}
					/>
				)}
			</Box>
		);
	}
}
