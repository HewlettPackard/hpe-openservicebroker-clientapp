import React, { Component } from "react";
import { Box, Grid } from "grommet";
import Card from "../card/Card";


//========================================= Catalog Results
const CatalogResults = () => (
  <Grid 
    gap='large' 
    columns='small' 
    rows='small'
    > 
    <Card /><Card /><Card /><Card /><Card /><Card /><Card /><Card />
    <Card /><Card /><Card /><Card /><Card /><Card /><Card /><Card />
    <Card /><Card /><Card /><Card /><Card /><Card /><Card /><Card />
    <Card /><Card /><Card /><Card /><Card /><Card /><Card /><Card />
    <Card /><Card /><Card /><Card /><Card /><Card /><Card /><Card />
    <Card /><Card /><Card /><Card /><Card />
  </Grid>
);

export default CatalogResults;