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
export default function StyleTrip (props) {
    return (
        <div className="trip-card">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <img className="trip_face-photo" src="https://image.shutterstock.com/image-photo/long-exposure-picture-beautiful-scenery-260nw-661882921.jpg" />
                </Grid>
                <Grid item xs>
                    <h5>Katie Le</h5>
                    <p>Dickinson College</p>
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
                    </span>07/12/2020
                </p>
                <p className="sub-text">
                    <span className="icon-circle">
                        <FontAwesomeIcon className="trip-icon trip-icon--time" icon={faClock}></FontAwesomeIcon>
                    </span>3am
                </p>
                <p className="sub-text">
                    <span className="icon-circle">
                        <FontAwesomeIcon className="trip-icon trip-icon--seats" icon={faUserFriends}></FontAwesomeIcon>
                    </span>4 seats
                </p>
                <p className="sub-text">
                    <span className="icon-circle">
                        <FontAwesomeIcon className="trip-icon trip-icon--note" icon={faStickyNote}></FontAwesomeIcon>
                    </span>Buy me waffles
                </p> 
            </div> 
            <Grid container spacing={1} className="grid-trip">
                <Grid item xs={5}>
                    <div className="trip-card-btn">Edit</div> 
                </Grid>
                <Grid item>
                    <div className="trip-card-btn">Contact</div> 
                </Grid>
            </Grid>         
        </div>
    );
}
