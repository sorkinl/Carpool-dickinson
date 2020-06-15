import firebase from "../../firebase/firebaseConfig";
import { GET_TRIPS, MAKE_TRIP, DELETE_TRIP } from "../constants/trip-types";
import axios from "axios";

const firestore = firebase.firestore();
export function getTrips() {
  //TODO retrieve trips from the database
  var trips = firestore.collection("trips");
  return async (dispatch, getState) => {
    const getTrips = await trips.where("destination.longitude", "<=", 14).get();
    dispatch({
      type: GET_TRIPS,
      payload: getTrips.docs.map((doc) => doc.data()),
    });
  };
}

export const createTrip = (payload) => {
  //TODO put trip into the database

  return async (dispatch) => {
    const search = encodeURIComponent(payload.pickup);
    const response = await axios.get(
      `https://geocode.search.hereapi.com/v1/geocode?q=${search}&apiKey=${process.env.REACT_APP_HERE_KEY}`
    );
    console.log(response);
    const data = await firestore.collection("trips").add({
      uid: firebase.auth().currentUser.uid,
      destTitle: response.data.items[0].title,
      destination: new firebase.firestore.GeoPoint(
        response.data.items[0].position.lat,
        response.data.items[0].position.lng
      ),
      departTime: new firebase.firestore.Timestamp.now(),
    });
    dispatch({ type: MAKE_TRIP, payload: data });
  };
};

//payload.uid
//https://stackoverflow.com/questions/49682327/how-to-update-a-single-firebase-firestore-document
export const editTrip = (payload, id) => {
  //TODO edit trip in the database based on id
  const trips = firestore.collection("trips");
  return async (dispatch) => {
    trips.doc(id).update({
      ...payload
    });

    //const data = trips.doc(tripId);
    // const data = trips.doc('rcHJgOZl9jToAVUPLRzD');
    // await data.update({
    //   departTime: payload.departTime,
    //   destTitle: payload.destTitle,
    //   pickupTitle: payload.pickupTitle, 
    //  // destination: payload.destination,

    // })
    // .then(doc => {
    //   if(doc){
    //     console.log(doc.data());
    //   }
    //   console.log(payload);
    // });
   // dispatch({type: EDIT_TRIP, payload: data});
  };
}

export const deleteTrip = (tripId) => {
  var trips = firestore.collection("trips");
  return async (dispatch) => {
    try {
      const deleteTrip = trips.doc(tripId).delete();
    } catch (err) {
      console.error("Error removing document: ", err);
    }
  };
};

