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
    const { text } = this.props;
    let back = <Box />;
    let buttons = <Box width='50%' />;

    switch (text) {
      case 'Login': 
        break;
      case 'Catalog':
        buttons =
          <Box
            direction='column'
            align='end'
            justify='center'
            width='50%'
            gap='medium'
            pad={{ right: '10%' }}
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
        break;
      case 'Register Broker': 
      case 'Unregister Broker': 
      case 'Deploy Service': 
      case 'Undeploy Service': 
        back = 
          <Link to='/'>
            <Button
              plain
              color='brand'
              label='Catalog'
              margin={{ top: 'small' }}
              gap='xsmall'
              icon={<LinkPrevious size='medium' color='brand' />}
            />
          </Link> 
        break;
      default:
    }

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
				>
          {back}
					<LogoAndTitle text={this.props.text} />
				</Box>
					{buttons}
			</Box>
		);
	}
};

export default AppBar;
