import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded } from "react-redux-firebase";
import {
    Grid
} from '@material-ui/core';
import StyleTrip from './Trip-new/StyleTrip';
import Console from './Trip-new/Console';

export default function TripArea(props){
  
    // ------------- Handling trips ----------------- //
    const currentUser = useSelector((state) => state.firebase.auth.uid); //takes the current user uid. Same as firebase.auth().currentUser.uid
    useFirestoreConnect([
      {
        // hook from 'react-redux-firebase' library to get the collection and store it in react-redux-firebase firestore reducer
        collection: "trips",
        where: ["uid", "==", currentUser], //condition
        storeAs: "userTrips", //name of the object to store in firestore reducer
      },
    ]);
  
    const userTrips = useSelector((state) => state.firestore.ordered.userTrips); //takes out array of trips queried above and takes it out of firestore reducer

    return (
        <div class="profile-tab">
            <h4>My Trips</h4>
            <hr/>
                <input type="radio" id="tab1" name="tab-control" defaultChecked/>
                <input type="radio" id="tab2" name="tab-control"/>
                <input type="radio" id="tab3" name="tab-control"/>  
                <input type="radio" id="tab4" name="tab-control"/>
            <ul>
                <li title="Console">
                    <label for="tab1" role="button">
                        <span>Console</span>
                    </label>
                </li>
                <li title="Upcoming">
                    <label for="tab2" role="button">
                        <span>Upcoming</span>
                    </label>
                </li>
                <li title="Past">
                    <label for="tab3" role="button">
                        <span>Past</span>
                    </label>
                </li>    
                <li title="Posted">
                    <label for="tab4" role="button">
                        <span>Posted</span>
                    </label>
                </li>
            </ul>
                
            <div class="slider">
                <div class="indicator"></div>
            </div>
                
            <div class="content-profile">
                <section>
                    <h2>Console</h2>
                        <Console/>
                </section>
                <section>
                    <h2>Upcoming</h2>
                        Tab 22 
                </section>
                <section>
                    <h2>Past</h2>
                        Tab 3
                </section>
                <section>
                    <h2>Posted</h2>
                    {/* { upcomingTripList.length === 0 ? (
                    <><Grid container spacing={3} className="">
                        <StyleTrip/>
                        <StyleTrip/>
                        <StyleTrip/>
                    </Grid></> )
                 : "" }    */}
                    {isLoaded(userTrips) && (userTrips.length > 0 ? (
                    <Grid container spacing={3}>
                        {userTrips.map((trip) => {
                            return (
                                <StyleTrip
                                    trip={{ 
                                        originTitle: trip.originTitle,
                                        destTitle: trip.destTitle,
                                        departDate: trip.departDate.toDate(),
                                        departTime: trip.departTime,
                                        emptySeat: trip.emptySeat,
                                        description: trip.description,
                                        id: trip.id,
                                        firstName: trip.firstName,
                                        lastName: trip.lastName,
                                        //uid: currentUser,
                                    }}
                                />
                            );
                        })}
                    </Grid>
                    ) : <>YOU CURRENTLY HAVE NO TRIPS</> )}
                </section>
            </div>
        </div>    
    )
}