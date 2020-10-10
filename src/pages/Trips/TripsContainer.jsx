import React from "react";
import { useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import TripCardSearch from "../../components/Search/TripCardSearch";
import firebase from "../../firebase/firebaseConfig";
const TripsContainer = (props) => {
  useFirestoreConnect([
    {
      collection: "trips",
      where: ["requests", "array-contains", firebase.auth().currentUser.uid],
      storeAs: "requestedTrips",
    },
    {
      collection: "trips",
      where: ["uid", "==", firebase.auth().currentUser.uid],
      storeAs: "myTrips",
    },
  ]);

  const requestedTrips = useSelector(
    (state) => state.firestore.ordered.requestedTrips
  );
  const myTrips = useSelector((state) => state.firestore.ordered.myTrips);

  return (
    <div className="trips-container">
      <div className="trips-container__requests">
        <h1>Requested Trips</h1>
        {isLoaded(requestedTrips) &&
          requestedTrips.map((trip) => <TripCardSearch {...trip} />)}
      </div>
      <div className="trips-container__mytrips">
        <h1>My trips</h1>
        {isLoaded(myTrips) &&
          myTrips.map((trip) => <TripCardSearch {...trip} />)}
      </div>
    </div>
  );
};

export default TripsContainer;
