import React, { useState, useEffect } from "react";
import "./TripList.css";
import Trip from "./Trip";
import { blue } from "@material-ui/core/colors";
import {
  makeStyles,
  CssBaseline,
  Typography,
  Box,
  Grid,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useSelector } from "react-redux";
import { getTripsByUser } from "../../../redux/actions/profileActions";
import { useFirestoreConnect } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "19%",
    flexShrink: 0,
    color: theme.palette.inherit,
    align: "left",
  },
  expandedPanel: {
    backgroundColor: blue[50],
  },
}));

export default function TripList(props) {
  const [pastTripList, setPastTripList] = useState("")
  const [upcomingTripList, setUpcomingPastTripList] = useState("")

  // ------------- Handling trips ----------------- //

  const currentUser = useSelector((state) => state.firebase.auth.uid); //takes the current user uid. Same as firebase.auth().currentUser.uid
  useFirestoreConnect([
    {
      // hook from 'react-redux-firebase' library to get the collection and store it in react-redux-firebase firestore reducer
      collection: "trips",
      where: ["uid", "==", currentUser], //condition
      storeAs: "userTrips", //name of the object to store in firestore reducer
    },
  ]);

  // function onCreate()

  const userTrips = useSelector((state) => state.firestore.ordered.userTrips); //takes out array of trips queried above and takes it out of firestore reducer
  // const pastTripList =[]

  const tempNext = []
  const tempPrev = []
  useEffect(()=>{
    if(userTrips){
      userTrips.map((x)=>{
          if(x.departTime < new Date().setHours(0,0,0,0)){
            tempPrev.push(x)
          }else{
            tempNext.push(x)
          }
  
        })
     }

  }, [userTrips, tempNext, tempPrev])
  const change = ()=>{
    setPastTripList(tempPrev)  
    setUpcomingPastTripList(tempNext)
  } 
  const classes = useStyles();
 
   //List of past trips, queried by every trips before today 



  return (
    <CssBaseline>
      <Box m={3} pt={0} className="TripList">
        <Typography variant="h5" color="inherited" gutterBottom align="left">
          My Trips
        </Typography>
        <div className={classes.root}>
          {/* View future trip list panel. Change the state of fuTrip if this panel is clicked. */}
          <ExpansionPanel     
            classes={{ expanded: classes.expandedPanel }}
            id = "upcoming-trip-panel"
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>
                View upcoming trips
              </Typography>
            </ExpansionPanelSummary>
            {/* Display trips if there exists at least 1 trip, otherwise just text*/}
            <ExpansionPanelDetails>
              {
              // fuTrip === true
              upcomingTripList!=="" &&
                (upcomingTripList.length > 0 ? (
                  <Grid container spacing={3} className="Future-trip-list">
                    {
                      upcomingTripList.map((trip) => {
                  
                        return (
                          <Trip
                            trip={{
                              from: trip.originTitle,
                              to: trip.destTitle,
                              date: new Date(trip.departDate.seconds*1000).toLocaleDateString("en-US"),
                              time: trip.departTime,
                              comment: trip.description,
                              id: trip.id
                              //uid: currentUser,
                            }}
                          />
                        );
                      }) //passes id of trip as a prop to trip component
                    }
                  </Grid>
                ) : (
                  <Typography variant="overline" color="textSecondary">
                    YOU CURRENTLY HAVE NO TRIPS
                  </Typography>
                ))}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          {/* View past trip list panel. */}
          {console.log(pastTripList)}
          <ExpansionPanel
            onChange={change}
            classes={{ expanded: classes.expandedPanel }}
            id="past-trip-panel"
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading}>
                View past trips
              </Typography>
            </ExpansionPanelSummary>
            {/* Display trips if there exists at least 1 trip, otherwise just text*/}
            <ExpansionPanelDetails>
              {pastTripList !== "" &&
                (pastTripList.length > 0 ? (
                  <Grid container spacing={3} className="Past-trip-list">
                    {pastTripList.map((trip) => {
                      return (
                        <Trip
                          trip={{
                            from: trip.originTitle,
                            to: trip.destTitle,
                            date: new Date(trip.departDate.seconds*1000).toLocaleDateString("en-US"),
                            time: trip.departTime,
                            comment: trip.description,
                            id: trip.id
                            //uid: currentUser,
                          }}
                        />
                      );
                    })}
                  </Grid>
                ) : (
                  <Typography variant="overline" color="textSecondary">
                    YOU CURRENTLY HAVE NO TRIPS
                  </Typography>
                ))}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Box>
    </CssBaseline>
  );
}
