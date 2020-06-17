import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Rating from "@material-ui/lab/Rating";
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Menu, MenuItem } from "@material-ui/core/";
import { useFirestore } from "react-redux-firebase";

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: "40.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
});
export default function Trip(props) {
  const trip = props.trip;
  const classes = useStyles();

  //------------ Menu handlers ------------//
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const firestore = useFirestore(); //use firestore reducer from 'react-redux-firebase'
  function handleDelete(e) {
    e.preventDefault();
    firestore.delete({
      collection: "trips", //function similar to the one in firebase, updates both firestore and local firestore reducer
      doc: props.trip.id, //prop is passed from trip list
    });
  }

  return (
    <Grid item xs={4} className="Trip">
      <Card className={classes.root} gutterBottom>
        {/* Display the driver's name and location */}
        <CardHeader
          avatar={
            <Avatar aria-label="name" className={classes.avatar}>
              M
            </Avatar>
          }
          title={trip.first + " " + trip.last}
          align="left"
          subheader={trip.school}
        />
        {/* Picture (can be removed) */}
        <CardMedia className={classes.media} image={trip.image} title="Car" />
        {/* Display a trip's bsic info */}
        <CardContent>
          {/* Date */}
          <Typography variant="body1" color="primary" align="left">
            <EventIcon color="primary" /> {trip.date}
          </Typography>
          {/* Starting point */}
          <Typography variant="body1" color="textPrimary" align="left">
            <LocationOnIcon color="action" /> {trip.from}
          </Typography>
          {/* Destination */}
          <Typography variant="body1" color="textPrimary" align="left">
            <LocationCityIcon color="action" /> {trip.to}
          </Typography>
          {/* Cost */}
          <Typography variant="body1" color="inherit" align="left" gutterBottom>
            <AttachMoneyIcon color="action" /> {trip.cost}
          </Typography>
          {/* Rating */}
          <Typography variant="body1" color="inherit" align="left">
            <Rating
              name="rating-for-fun"
              value={trip.rating}
              precision={0.5}
              readOnly
            />
          </Typography>
        </CardContent>
        {/* Buttons */}
        <CardActions>
          <Button onClick={handleMenu} size="small" color="primary">
            Modify trip
          </Button>
          <Button size="small" color="primary">
            Contact driver
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleDelete}>Delete this trip</MenuItem>
          </Menu>
        </CardActions>
      </Card>
    </Grid>
  );
}
