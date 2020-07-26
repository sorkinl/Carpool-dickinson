import React from "react";
import { Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchLocation,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function Console (props) {
    return (
        <div className="console">
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <div className="console post-area">
                        <a href="/postRide">
                            <div className="post-icon">
                                <FontAwesomeIcon className="post-icon--plus" icon={faPlus}></FontAwesomeIcon>
                                <p className="post-text">Post new ride</p>
                            </div>
                        </a>
                       
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className="console find-area">
                        <a href="/search">
                            <div className="find-icon">
                                <FontAwesomeIcon className="find-icon--search"icon={faSearchLocation}></FontAwesomeIcon>
                            </div>
                        </a>
                        <p className="find-text">Find a ride</p>
                    </div>
                </Grid>
            </Grid>
        </div>
    
    );
}