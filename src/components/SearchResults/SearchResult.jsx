import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EachResult from '../EachResult/EachResult';
import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography';

import tempMap from "../../static/img/tempMap.png";
import {HereMap} from '../HereMap/HereMap'
import './SearchResult.css';
import {useDispatch, useSelector} from 'react-redux'
import Mapbox from '../../api/mapbox/mapbox'
import { getTrips } from '../../redux/actions/tripsActions';
import { getMaxAndMinLat } from '../../Utils/Distance';


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

  const tripList = trips.map((trip) => 
    <EachResult
                
                comment = {"Leaving between 2pm-4pm"}
                starting = {trip.origin_title}
                destination = {trip.destination_title}
                />
  )
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

            {/* <EachResult
                name = {"ABCD Lee"}
                occupation = {"Dickinson College"}
                comment = {"Leaving between 2pm-4pm"}
                starting = {"Dickinson College"}
                destination = {"Harrisburg"}
                rating = {4}
                nickname = "Alex"
                /> */}

            {tripList}
                
                

          </Grid>

        {/* Map */}
      <div id= "dasdas">
          <div id = "mapDiv">
            {/* <img id = "map" alt = "temp map" src = {tempMap} /> */}
              <HereMap />
          </div>
      </div>
        

        </div>

     
      </Grid>


    </Paper>
    

  );
}

export default SearchResult;
