import React, { useState, useEffect } from 'react';
import Trip from "./Trips/Trip";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import {
    Typography,
    Grid
} from '@material-ui/core';
import StyleTrip from './Trips/StyleTrip';

export default function TripCard(props){
    const [pastTripList, setPastTripList] = useState("");
    const [upcomingTripList, setUpcomingTripList] = useState("");
  
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
  
    // function onCreate()
  
    const userTrips = useSelector((state) => state.firestore.ordered.userTrips); //takes out array of trips queried above and takes it out of firestore reducer
    // const pastTripList =[]
  
    const tempNext = []
    const tempPrev = []
    
    useEffect(()=>{
      if(userTrips){
        userTrips.map((x)=>{
            if(x.departTime < new Date().setHours(0,0,0,0)){
              tempPrev.push(x)
            }else{
              tempNext.push(x)
            }
    
          })
       }
  
    }, [userTrips, tempNext, tempPrev])
    
    const change = () => {
      setPastTripList(tempPrev)  
      setUpcomingTripList(tempNext)
    } 

    return (
        <div class="tabs">
            <h4>My Trips</h4>
            <hr/>
                <input type="radio" id="tab1" name="tab-control"defaultChecked/>
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
                
            <div class="content">
                <section>
                    <h2>Console</h2>
                    Tab 1 
                </section>
                <section>
                    <h2>Upcoming</h2>
                        Tab 2   
                </section>
                <section>
                    <h2>Past</h2>
                        Tab 3
                </section>
                <section>
                    <h2>Posted</h2>
                    { upcomingTripList.length === 0 ? (
                    <><Grid container spacing={3} className="">
                        <StyleTrip/>
                        {/* <Trip
                            trip={{
                                firstName: "Katie",
                                lastName: "Le",
                                from: "Dickinson",
                                to: "Harvey Mudd",
                                date: "",
                                time: "5am",
                                school: "Dickinson College",
                                description: "no pets",
                                emptySeat: "4 seats",
                                id: "", 
                                //uid: currentUser,
                             }}
                        />
                        <Trip
                            trip={{
                                firstName: "Katie",
                                lastName: "Le",
                                from: "Dickinson",
                                to: "Harvey Mudd",
                                date: "",
                                time: "5am",
                                school: "Dickinson College",
                                emptySeat: "4 seats",
                                description: "no pets",
                                id: "", 
                                //uid: currentUser,
                             }}
                        />
                        <Trip
                            trip={{
                                firstName: "Katie",
                                lastName: "Le",
                                from: "Dickinson",
                                to: "Harvey Mudd",
                                date: "",
                                time: "5am",
                                school: "Dickinson College",
                                emptySeat: "4 seats",
                                description: "no pets",
                                id: "", 
                                //uid: currentUser,
                             }}
                        /> */}
                        </Grid></> )
                 : "" }   
                </section>
            </div>
        </div>    
    )
}