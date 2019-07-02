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
				justify='center'
				pad={{ left: 'small' }}
				border={{ color: 'dark-1', side: 'bottom' }}
				background={{ color: 'white' }}
			>
				<Box width='5%'/>
				<Box
					width='45%'
					direction='column'
					align='start'
					justify='center'
					pad={{ left: 'small', top: 'small' }}
					margin={{ bottom: 'small' }}
					//border={{ color: 'red' }}
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
					width='50%'
					gap='medium'
					pad={{ right: '10%' }}
					//border={{ color: 'red' }}
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
