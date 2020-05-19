import React from 'react';
import './Trip.css';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';

import {Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography, Button} from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '40.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },

});

export default function Trip(props) {
    const trip = props.trip;
    const classes = useStyles();

    return (
      <Grid item xs={4} className="Trip">
        <Card className={classes.root} gutterBottom>
            <CardHeader
                avatar={
                  <Avatar aria-label="name" className={classes.avatar}>M</Avatar>
                }
                title={trip.first + " " + trip.last} align='left'
                subheader={trip.school}
            />
            <CardMedia
                className={classes.media}
                image={trip.image}
                title="Car"
            />
            <CardContent>
              <Typography variant="body1" color="primary" align='left'>
                <EventIcon color="primary"/> {trip.date}
              </Typography>
              <Typography variant="body1" color="textPrimary" align='left'>
                <LocationOnIcon color="action"/> {trip.from}
              </Typography>
              <Typography variant="body1" color="textPrimary" align='left'>
                <LocationCityIcon color="action"/> {trip.to}
              </Typography>
              <Typography variant="body1" color="inherit" align='left' gutterBottom>
                <AttachMoneyIcon color="action"/> {trip.cost}
              </Typography>

              <Typography variant="body1" color="inherit" align='left'>
              <Rating name="rating-for-fun" value={trip.rating} precision={0.5} readOnly />
                </Typography>
              </CardContent>
              <CardActions>
                  <Button size="small" color="primary">
                    Modify trip
                  </Button>
                  <Button size="small" color="primary">
                    Contact driver
                  </Button>
              </CardActions>
          </Card>
      </Grid>
    );
}
