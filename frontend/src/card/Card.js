import React, { Component } from "react";
import { Box } from "grommet";


//========================================= Card
class Card extends Component {
  // static propTypes = {
  //   text: PropTypes.string.isRequired
  // };

  render() {
    return (
      <Box 
        elevation='medium' 
        background={{color: 'light-3'}}
        border={{color: 'light-5'}}
        round='xsmall'
        width='small'
      >
      </Box>
    );
  };
};

export default Card;