import React, { useState } from 'react';
import './TripList.css';
import Trip from './Trip';
import { pink } from '@material-ui/core/colors';
import {makeStyles, CssBaseline, Paper, Typography, Box, Grid, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { getTripsByUser } from '../../../redux/actions/profileActions';


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
  expandedPanel: {
    backgroundColor: pink[50],
  },
 }));

 export default function TripList(props) {
    //Initialize the states of fuTrip (future trip) and pastTrip (Default value = false).
    const [fuTrip, setFuTrip] = useState(false);
    const [pastTrip, setPastTrip] = useState(false);

    const classes = useStyles();
    const trips = useSelector(state => state.profileReducer.userTrips)
    const dispatch = useDispatch();
    //An object storing Trip's info
    const trip = {
      image: "https://cdn.aarp.net/content/dam/aarp/travel/tips/2020/05/1140-person-driving.jpg",
      date: "mm/dd/yyyy",
      cost: "$3.05",
      from: "Carlisle",
      to: "New York",
      first: "Miyamoto",
      last: "Smith",
      school: "Dickinson College"
    };

    React.useEffect(()=> {
      dispatch(getTripsByUser());
    }, [])
    //List of future trips
    const futureTripList = [];
    //List of past trips
    const pastTripList = [trip, trip, trip, trip, trip];


    return(
    <CssBaseline>
      <Box m ={3} pt = {0} className="TripList">
            <Typography variant="h5" color="inherited" gutterBottom align='left'>My Trips</Typography>
            <div className={classes.root}>
            {/* View future trip list panel. Change the state of fuTrip if this panel is clicked. */}
            <ExpansionPanel  onChange={()=> {setFuTrip(!fuTrip)}} classes={{ expanded: classes.expandedPanel }}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                    <Typography className={classes.heading}>View upcoming trips</Typography>
                </ExpansionPanelSummary>
                {/* Display trips if there exists at least 1 trip, otherwise just text*/}
                <ExpansionPanelDetails>
                    { fuTrip == true && ( trips.length > 0 ?
                         <Grid container spacing={3} className="Future-trip-list">
                             {
                                 trips.map(trip => {return (<Trip trip={{
                                 from: trip.origin_title,
                                 to: trip.destination_title,}}/>);})
                             }
                         </Grid>
                         :
                         <Typography variant='overline' color='textSecondary'>YOU CURRENTLY HAVE NO TRIPS</Typography>

                    )}

                </ExpansionPanelDetails>
            </ExpansionPanel>
            {/* View past trip list panel. Change the state of pastTrip if this panel is clicked. */}
            <ExpansionPanel onChange={()=> {setPastTrip(!pastTrip)}} classes={{ expanded: classes.expandedPanel }}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                >
                    <Typography className={classes.heading}>View past trips</Typography>
                </ExpansionPanelSummary>
                {/* Display trips if there exists at least 1 trip, otherwise just text*/}
                <ExpansionPanelDetails>
                  { pastTrip == true && ( pastTripList.length > 0 ?
                     <Grid container spacing={3} className="Past-trip-list">
                         {
                             pastTripList.map(trip => {return (<Trip trip={trip}/>);})
                         }
                     </Grid>
                     :
                     <Typography variant='overline' color='textSecondary'>YOU CURRENTLY HAVE NO TRIPS</Typography>
                   )}
                </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </Box>
      </CssBaseline>
      );
  }
