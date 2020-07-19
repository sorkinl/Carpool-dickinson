import React from "react";
import { Grid } from "@material-ui/core";

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
              
            </div>
            
        </div>
    );
}
