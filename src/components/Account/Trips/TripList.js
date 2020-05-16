import React, { useState } from 'react';
import './TripList.css';
import Trip from './Trip';
import {makeStyles, Paper, Typography, Box, Grid, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
   fontSize: theme.typography.pxToRem(15),
   flexBasis: '19%',
   flexShrink: 0,
   color: theme.palette.inherit,
   align: 'left',
 },
 }));

 export default function TripList(props) {
    const [fuTrip, setFuTrip] = useState(false);
    const [pastTrip, setPastTrip] = useState(false);

    const classes = useStyles();
    const trip = {
      image: "https://cdn.aarp.net/content/dam/aarp/travel/tips/2020/05/1140-person-driving.jpg",
      date: "mm/dd/yyyy",
      cost: "$3.05",
      from: "Carlisle",
      to: "New York",
      first: "Miyamoto",
      last: "Smith",
      school: "Dickinson College",
      rating: 4.5
    };

    const futureTripList = [trip, trip, trip, trip, trip];
    const pastTripList = [trip, trip, trip, trip, trip];

    return(
      <Box m ={3} pt = {0} className="TripList">
            <Typography variant="h5" color="inherited" gutterBottom align='left'>My Trips</Typography>
            <div className={classes.root}>
            <ExpansionPanel  onChange={()=> {setFuTrip(!fuTrip)}}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                    <Typography className={classes.heading}>View upcoming trips</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={3} className="Future-trip-list">
                        { fuTrip == true &&
                            futureTripList.map(trip => {return (<Trip trip={trip}/>);})
                        }
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel onChange={()=> {setPastTrip(!pastTrip)}}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                    <Typography className={classes.heading}>View past trips</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={3} className="Past-trip-list">
                        { pastTrip == true &&
                            pastTripList.map(trip => {return (<Trip trip={trip}/>);})
                        }
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </Box>
      );
  }
