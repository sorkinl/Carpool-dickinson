import React from "react";
import { Grid } from "@material-ui/core";
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
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from 'react-redux';
import EditForm from '../Trips-old/editform';
import Popup from "reactjs-popup";

export default function StyleTrip (props) {

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
        handleClosePopup();
        //e.preventDefault();
        firestore.delete({
            collection: "trips", //function similar to the one in firebase, updates both firestore and local firestore reducer
            doc: props.trip.id, //prop is passed from trip list
        });
    }
    
    return (
        <div className="trip-card">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <img className="trip_face-photo" src={tripToEdit.photoUrl}/>
                </Grid>
                <Grid item xs>
                    <h5>{trip.firstName + " " + trip.lastName}</h5>
                    <p>Dickinson College</p> {/* just a shortcut -> can instead query school from uid */}
                </Grid>
            </Grid>
            <div className="inner-box">
                <p className="sub-text">
                    <span className="icon-circle">
                        <FontAwesomeIcon className="trip-icon trip-icon--origin" icon={faMapPin}></FontAwesomeIcon>
                    </span>{trip.originTitle}
                </p>
                <p className="sub-text">
                    <span className="icon-circle">
                        <FontAwesomeIcon className="trip-icon trip-icon--destination" icon={faMapMarkerAlt}></FontAwesomeIcon>
                    </span>{trip.destTitle}
                </p>
                <p className="sub-text">
                    <span className="icon-circle">
                        <FontAwesomeIcon className="trip-icon trip-icon--date" icon={faCalendarDay}></FontAwesomeIcon>
                    </span>{(trip.departDate.getMonth()+1) + '/' + trip.departDate.getDate() + '/' + trip.departDate.getFullYear()}
                </p>
                <p className="sub-text">
                    <span className="icon-circle">
                        <FontAwesomeIcon className="trip-icon trip-icon--time" icon={faClock}></FontAwesomeIcon>
                    </span>{trip.departTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="sub-text">
                    <span className="icon-circle">
                        <FontAwesomeIcon className="trip-icon trip-icon--seats" icon={faUserFriends}></FontAwesomeIcon>
                    </span>{trip.emptySeat} empty seats
                </p>
                <p className="sub-text">
                    <span className="icon-circle">
                        <FontAwesomeIcon className="trip-icon trip-icon--note" icon={faStickyNote}></FontAwesomeIcon>
                    </span>{trip.description}
                </p> 
            </div> 
            <Grid container spacing={1} className="grid-trip">
                <Grid item xs={5}>
                    <div className="trip-card-btn" onClick={handleClickOpen} >Edit</div> 
                </Grid>
                <Grid item>
                    <div className="trip-card-btn"  onClick={handleMenu} >Contact</div> 
                </Grid>
            </Grid> 
             {/* Edit Popup  */}
            <Popup 
                contentStyle={{width: "30rem"}}
                onClose={handleClosePopup}
                className="edit-popup container"
                open= {openPopup}   >  
                <EditForm trip={tripToEdit} tripId={tripId} closePopup={handleClosePopup} handleDelete={handleDelete} />
            </Popup>       
        </div>
    );
}
