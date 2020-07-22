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
import EditForm from './editform';
import Popup from "reactjs-popup";



const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: "40.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
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

export default function Trip(props) {
  const classes = useStyles();
 
  const trip = props.trip;

  //get trip id from trip object that is coming from TripList
  const tripId = props.trip.id;

  //connect with firestore and retrieve the data directly from the firestore
  useFirestoreConnect([
    { collection: 'trips' }
  ]);
  //get trip object that has qeuried tripId
  const tripToEdit = useSelector((state) => state.firestore.data.userTrips[tripId]);

  //useState for controlling popup
  const [openPopup, setOpenPopup] = React.useState(false);
  const handleClickOpen = () => {
    setOpenPopup(true);
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  //button shows different component depending on whether tripToEdit exists
  // const showLink = tripToEdit? (
  //  <Link to={`edit/${props.trip.id}`}>
  //           <Button size="small" color="primary">
  //              Modify trip
  //           </Button>
  //  </Link>
  // ) : (
  //   <div>
  //     <Button size="small" color="primary" onClick={handleClickOpen}>
  //       Modify trip
  //     </Button>
  //     <Dialog onClose={handleClosePopup} aria-labelledby="customized-dialog-title" open={openPopup}>
  //       <DialogTitle id="customized-dialog-title" onClose={handleClosePopup}>
  //         Warning
  //       </DialogTitle>
  //       <DialogContent dividers>
  //         <Typography gutterBottom>
  //           404: Cannot find the requested trip!
  //         </Typography>
  //       </DialogContent>
  //       <DialogActions>
  //          <Button autoFocus onClick={handleClosePopup} color="primary">
  //            Close
  //          </Button>
  //        </DialogActions>
  //      </Dialog>
  //   </div>   
  // );




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
    <Grid item xs={4} className="Trip">
      <Card className={classes.root} gutterBottom>
        {/* Display the driver's name and location */}
        <CardHeader
          avatar={
            <Avatar aria-label="name" className={classes.avatar}>
              {tripToEdit.photoUrl}
            </Avatar>
          }
          title={tripToEdit.user.firstName + " " + tripToEdit.user.lastName}
          align="left"
          subheader={trip.school}
        />
        {/* Picture (can be removed) */}
        {/* <CardMedia className={classes.media} image={trip.image} title="Car" /> */}
        {/* Display a trip's bsic info */}
        <CardContent>
          {/* Date */}
          <Typography variant="body1" color="primary" align="left">
            <EventIcon color="primary" /> {tripToEdit.departDate}
          </Typography>
          <Typography variant="body1" color="primary" align="left">
            <TimerIcon color="primary" /> {trip.time}
          </Typography>
          
          {/* Starting point */}
          <Typography variant="body1" color="textPrimary" align="left">
            <LocationOnIcon color="action" /> {tripToEdit.originTitle}
          </Typography>
          {/* Destination */}
          <Typography variant="body1" color="textPrimary" align="left">
            <LocationCityIcon color="action" /> {tripToEdit.destTitle}
          </Typography>
          {/* Cost */}
          <Typography variant="body1" color="inherit" align="left" gutterBottom>
            <CommentIcon color="action" /> {trip.comment}
          </Typography>
          {/* Rating */}
          {/* <Typography variant="body1" color="inherit" align="left">
            <Rating
              name="rating-for-fun"
              value={trip.rating}
              precision={0.5}
              readOnly
            />
          </Typography> */}
        </CardContent>
        {/* Buttons */}
        <CardActions>
         {/* {showLink} */}
         <Button onClick = {handleClickOpen}> Modify trip</Button>

         <Popup 
             contentStyle={{width: "30rem"}}
             onClose={handleClosePopup}
             className="edit-popup container"
             open= {openPopup}   >  
            <EditForm trip={tripToEdit} tripId={tripId} closePopup={handleClosePopup} handleDelete={handleDelete} />
             </Popup>

          <Button onClick={handleMenu} size="small" color="primary">
            Contact driver
          </Button>
          {/* <Menu
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
          </Menu> */}
        </CardActions>
      </Card>
    </Grid>
  );
}
