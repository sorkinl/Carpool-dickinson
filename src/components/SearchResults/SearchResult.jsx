import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EachResult from '../EachResult/EachResult';
import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography';

import tempMap from "../../static/img/tempMap.png";

import './SearchResult.css';
import {useDispatch, useSelector} from 'react-redux'
import Mapbox from '../../api/mapbox/mapbox'
import { getTrips } from '../../redux/actions/tripsActions';


const useStyles = makeStyles((theme) => ({

  paper: {
   paddingLeft:50,

  },
  result:{
    width:"50%"
  },
  text:{
    textAlign:"left",
    marginTop:"3em",
    marginBottom:"1em"
  },
  imgDiv:{
    height:"100vh",
    width: "35%",
  }
}));






function SearchResult() {

  const classes = useStyles();
  const trips = useSelector(state => state.tripsReducer.trips);
  
   // useDispatch enables us to use redux dispatch function
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getTrips())
    
  },[]);
  return (

    <Paper classes = {{root:classes.paper}}>
      {/* Search Form */}
      <Grid container >
        <div id = "searchResultRoot">

        
          
          <Grid item className = {classes.result}>
            {/* Text Space */}
            <Grid item classes = {{root:classes.text}}>
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
            <EachResult/>
            <EachResult/>
            <EachResult/>
            <EachResult/>
            <EachResult/>
            <EachResult/>
            <EachResult/>
            <EachResult/>
            <EachResult/>
            <EachResult/>
            <EachResult/>
            <EachResult/>
            <EachResult/>
            <EachResult/>
            <EachResult/>
                
                

          </Grid>

        {/* Map */}
      <div id= "dasdas">
          <div id = "mapDiv">
            {/* <img id = "map" alt = "temp map" src = {tempMap} /> */}
            <Mapbox/>
          </div>
      </div>
        

        </div>

     
      </Grid>


    </Paper>
    

  );
}

export default SearchResult;
