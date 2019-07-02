import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from 'grommet';
import { Add, LinkPrevious, Sync } from 'grommet-icons';
import LogoAndTitle from '../logo-title/LogoTitle';
import PropTypes from 'prop-types';


//========================================= AppBar
class AppBar extends Component {
	static propTypes = {
		text: PropTypes.string.isRequired
	};

	render() {
		return (
			<Box
				direction='row'
				align='center'
				justify='start'
				pad={{ left: 'small' }}
			>
				<Box
					direction='column'
					align='start'
					justify='center'
					flex
					pad={{ left: 'small', top: 'small' }}
				>
					<Link to='/'>
						<Button
							plain
							color='brand'
							label='Catalog'
							gap='xsmall'
							icon={<LinkPrevious size='medium' color='brand' />}
						/>
					</Link>
					<LogoAndTitle text={this.props.text} />
				</Box>
				<Box
					direction='column'
					align='end'
					justify='center'
					flex
					gap='medium'
					pad={{ right: 'xlarge' }}
				>
					<Link to='/register'>
						<Button
							color='brand'
							label='Register Broker'
							gap='xsmall'
							icon={<Add size='medium' color='brand' />}
						/>
					</Link>
					<Button
						color='brand'
						label='Update Catalog'
						gap='xsmall'
						icon={<Sync size='medium' color='brand' />}
					/>
				</Box>
			</Box>
		);
	}
};

export default AppBar;
