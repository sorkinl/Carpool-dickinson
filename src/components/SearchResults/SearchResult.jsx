import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EachResult from "./EachResult/EachResult";
import { HereMap } from "../HereMap/HereMap";
import "./SearchResult.scss";
import { useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
  paper: {
    paddingLeft: 50,
  },
  result: {
    width: "50%",
  },
  text: {
    textAlign: "left",
    marginTop: "3em",
    marginBottom: "1em",
  },
  imgDiv: {
    height: "100vh",
    width: "35%",
  },
}));

const x = {
  "destination": {
    "longitude": 52,
    "latitude": 23
  },
  "destTitle": "DC",
  "departDate": "Tue Jun 23 2020",
  "user": {
    "firstName": "Leo",
    "photoUrl": "https://firebasestorage.googleapis.com/v0/b/carpool-d.appspot.com/o/malicious%20intent.PNG?alt=media&token=8ee5c837-537a-4acf-a551-a22c1e558298",
    "lastName": "Sorkin"
  },
  "departTime": "around 2pm",
  "originTitle": "Dickinson",
  "origin": {
    "latitude": 23,
    "longitude": 43
  },
  "uid": "ap3c09RwJVYvjYYoSfD5qLuNEAB3"
}

function SearchResult() {
  const classes = useStyles();

    const trips = useSelector(state=>state.tripsReducer)

    const tripList = trips.trips.map((trip) => (
      <EachResult info = {trip} />
    ))
  
   
  return (
    // <Paper classes={{ root: classes.paper }}>
    //   {/* Search Form */}
    //   <Grid container>
    //     <div id="searchResultRoot">
    //       <Grid item className={classes.result}>
    //         {/* Text Space */}
    //         <Grid item classes={{ root: classes.text }}>
    //           <Typography variant="body2" color="textSecondary">
    //             {trips.trips.length} results
    //           </Typography>
    //           <Typography variant="h3">Trip to...</Typography>
    //         </Grid>
    //         {tripList}
    //       </Grid>
    //       {/* Map */}
    //       <div id="dasdas">
    //         <div id="mapDiv">
    //           <HereMap />
    //         </div>
    //       </div>
    //     </div>
    //   </Grid>
    // </Paper>
    <div id = "searchresult__main">
      <div id = "searchresult__left">
        <div id = "searchresult__heading">
          <div id = "searchresult__triplength">
           {trips.trips.length} results
          </div>
          <div id = "searchresult__tripname">
            Trips to placename
          </div>
        </div>
        <hr className = "searchresult__hr"/>
        <div id = "searchresult__trips">
          {tripList}
        </div>
      </div>
      <div id = "searchresult__right">
        <div id = "searchresult__heremap">
         <HereMap />
        </div>
      </div>

    </div>
  )
}

export default SearchResult;
