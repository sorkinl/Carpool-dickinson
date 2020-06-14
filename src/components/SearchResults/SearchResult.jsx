import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EachResult from "./EachResult/EachResult";
import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { HereMap } from "../HereMap/HereMap";
import "./SearchResult.css";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded } from "react-redux-firebase";
import Loading from "../Loading";

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

function SearchResult() {
  const classes = useStyles();
  useFirestoreConnect(["trips"]);
  const trips = useSelector((state) => state.firestore.ordered.trips);

  const tripList = isLoaded(trips) ? (
    trips.map((trip) => (
      <EachResult
        comment={"Leaving between 2pm-4pm"}
        starting={trip.origin_title}
        destination={trip.destination_title}
      />
    ))
  ) : (
    <Loading />
  );

  return (
    <Paper classes={{ root: classes.paper }}>
      {/* Search Form */}
      <Grid container>
        <div id="searchResultRoot">
          <Grid item className={classes.result}>
            {/* Text Space */}
            <Grid item classes={{ root: classes.text }}>
              <Typography variant="body2" color="textSecondary">
                3 results
              </Typography>
              <Typography variant="h3">Trip to...</Typography>
            </Grid>
            {tripList}
          </Grid>
          {/* Map */}
          <div id="dasdas">
            <div id="mapDiv">
              <HereMap />
            </div>
          </div>
        </div>
      </Grid>
    </Paper>
  );
}

export default SearchResult;
