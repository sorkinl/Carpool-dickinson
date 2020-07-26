import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import EventIcon from "@material-ui/icons/Event";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import TimerIcon from '@material-ui/icons/Timer';
import CommentIcon from '@material-ui/icons/Comment';
import { Menu, MenuItem } from "@material-ui/core/";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { Link , useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faMapPin,
  faCalendarDay,
  faUserFriends,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import {
    faClock
} from "@fortawesome/free-regular-svg-icons";

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: "40.25%", // 16:9
  },

});

//styling for popup
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function JustTrip(props) {
  const classes = useStyles();
 
  const trip = props.trip;

  //get trip id from trip object that is coming from TripList
  const tripId = props.trip.id;

  //connect with firestore and retrieve the data directly from the firestore
  useFirestoreConnect([
    { collection: 'trips' }
  ]);
  //get trip object that has qeuried tripId
  // const tripToEdit = useSelector((state) => state.firestore.data.userTrips[tripId]);

  //useState for controlling popup
  const [openPopup, setOpenPopup] = React.useState(false);
  const handleClickOpen = () => {
    setOpenPopup(true);
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  //button shows different component depending on whether tripToEdit exists
  const showLink = tripToEdit? (
    <Link to={`edit/${props.trip.id}`}>
            <Button size="small" color="primary">
               Modify trip
            </Button>
    </Link>
  ) : (
    <div>
      <Button size="small" color="primary" onClick={handleClickOpen}>
        Modify trip
      </Button>
      <Dialog onClose={handleClosePopup} aria-labelledby="customized-dialog-title" open={openPopup}>
        <DialogTitle id="customized-dialog-title" onClose={handleClosePopup}>
          Warning
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            404: Cannot find the requested trip!
          </Typography>
        </DialogContent>
        <DialogActions>
           <Button autoFocus onClick={handleClosePopup} color="primary">
             Close
           </Button>
         </DialogActions>
       </Dialog>
    </div>   
   );



  //------------ Menu handlers ------------//
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  function handleMenu (event){
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
    <div className="trip-card">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <img className="trip_face-photo" src="https://image.shutterstock.com/image-photo/long-exposure-picture-beautiful-scenery-260nw-661882921.jpg" />
                </Grid>
                <Grid item xs>
                    <h5>{trip.firstName + " " + trip.lastName}</h5>
                    <p>{trip.school}</p>
                </Grid>
            </Grid>
            <div className="inner-box">
                <p className="sub-text">
                    <span className="icon-circle">
                        <FontAwesomeIcon className="trip-icon trip-icon--origin" icon={faMapPin}></FontAwesomeIcon>
                    </span>Dickinson College
                </p>
                <p className="sub-text">
                    <span className="icon-circle">
                        <FontAwesomeIcon className="trip-icon trip-icon--destination" icon={faMapMarkerAlt}></FontAwesomeIcon>
                    </span>Harrisburg Airport
                </p>
                <p className="sub-text">
                    <span className="icon-circle">
                        <FontAwesomeIcon className="trip-icon trip-icon--date" icon={faCalendarDay}></FontAwesomeIcon>
                    </span>{trip.date}
                </p>
                <p className="sub-text">
                    <span className="icon-circle">
                        <FontAwesomeIcon className="trip-icon trip-icon--time" icon={faClock}></FontAwesomeIcon>
                    </span>{trip.time}
                </p>
                <p className="sub-text">
                    <span className="icon-circle">
                        <FontAwesomeIcon className="trip-icon trip-icon--seats" icon={faUserFriends}></FontAwesomeIcon>
                    </span>{trip.emptySeat} seats
                </p>
                <p className="sub-text">
                    <span className="icon-circle">
                        <FontAwesomeIcon className="trip-icon trip-icon--note" icon={faStickyNote}></FontAwesomeIcon>
                    </span>{trip.description}
                </p> 
            </div> 
            <Grid container spacing={1} className="grid-trip">
                <Grid item xs={5}>
                    <div className="trip-card-btn" onClick={handleMenu}>Edit</div> 
                </Grid>
                <Grid item>
                    <div className="trip-card-btn">Contact</div> 
                </Grid>
            </Grid>  
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
        </div>
  );
}
