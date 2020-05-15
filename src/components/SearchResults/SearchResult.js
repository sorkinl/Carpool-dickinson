import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EachResult from '../EachResult/EachResult';
import { Paper, Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography';


import tempMap from "../../static/img/tempMap.png";

import './SearchResult.css';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  paper: {
    height: 500,
    width: "100%",
    margin:"auto"
  },
  result:{
    height:500,
    width: "55%",

    padding: 0,
    margin:'auto',
   // margin:theme.spacing(0)
  },
  map:{
    width:"42%"
  },
  mapImg:{
    height:490,

  },
  text:{
    textAlign:"left",
  }
}));

function SearchResult() {

  const classes = useStyles();

  return (

    <Box m ={5} pt = {0}>


    <Paper className = {classes.paper}>
      {/* Search Form */}
      <Grid container spacing = {2}>

        {/* Text Space */}

        <Grid item className = {classes.result}>
          <Grid item className = {classes.text}>

            <Typography variant="body2" color="textSecondary">
                  3 results
                </Typography>
            <Typography variant="h3">
              Trip to...
            </Typography>
          </Grid>

          <EachResult
              name = {"ABCD Lee"}
              occupation = {"Dickinson College"}
              comment = {"Leaving between 2pm-4pm"}
              starting = {"Dickinson College"}
              destination = {"Harrisburg"}
              rating = {4}
              nickname = "Alex"
              />

          <EachResult
              name = {"Johnski QPWOEI"}
              occupation = {"Penn State"}
              starting = {"Dickinson College"}
              destination = {"Boston"}
              rating = {4}
              nickname="John"
              />

        </Grid>

        {/* Map */}
        <Grid item sm container className = {classes.map}>
            <img className = {classes.mapImg} alt = "temp map" src = {tempMap} />
        </Grid>



      </Grid>


    </Paper>
    </Box>

  );
}

export default SearchResult;
