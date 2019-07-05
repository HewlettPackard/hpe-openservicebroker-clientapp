import React, { Component } from "react";
import { Box, Grid, TextInput } from "grommet";
import Card from "../card/Card";


//========================================= Catalog Results
class CatalogResults extends Component {
  state = {
    value: '',
    serviceList: [...this.props.services],
    showList: [...this.props.services]
  };
  
  static getDerivedStateFromProps(props, state) {
    return {
      serviceList: [...props.services],
      showList: [...props.services]
    };
  } 

  search = (value) => {
    let tempList = [];
    this.setState({ showList: this.state.serviceList });
    
    if (value === '')
      return;
    else {
      this.state.showList.forEach( service => {
        if (service.name.search(value) !== -1)
        tempList.push(service);
      });
      
      this.setState({ showList: tempList });
    }
  };
    
  setValue = (event) => {
    this.setState({ value: event.target.value });
    //console.log(event.target.value);
    this.search(event.target.value);
  };

  render() {
    const { showList, value } = this.state;

    return (
      <Box fill>
        <Box fill='horizontal' flex={false}>
          <Box 
            width='70%' 
            alignSelf='center' 
            margin={{ bottom: 'large' }} 
            border={{size: 'xsmall', color: 'accent-1'}}
          >
            <TextInput
              placeholder="search"
              value={value}
              onChange={this.setValue}
            />
          </Box>
        </Box>
        <Grid 
          gap='large'
          columns='small'
          rows='small'
        > 
          {showList.map( service => <Card service={service} key={service.name} />)}
        </Grid>
      </Box>
    );
  } 
}
      
export default CatalogResults;