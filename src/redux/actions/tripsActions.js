import firebase from "../../firebase/firebaseConfig";
import { GET_TRIPS, MAKE_TRIP, DELETE_TRIP } from "../constants/trip-types";
import axios from "axios";

const firestore = firebase.firestore();
export function getTrips() {
  //TODO retrieve trips from the database
  var trips = firestore.collection("trips")
  return async (dispatch, getState) => {
        const getTrips =  await trips.where('destination.longitude', "<=", 14).get();
        dispatch({type: GET_TRIPS, payload: getTrips.docs.map(doc => doc.data())})
    }
}

export const createTrip = (payload) => {
  //TODO put trip into the database

  return async (dispatch) => {
    
    const search = encodeURIComponent(payload.pickup)
    const response = await axios.get(
      `https://geocode.search.hereapi.com/v1/geocode?q=${search}&apiKey=${process.env.REACT_APP_HERE_KEY}`
    );
    console.log(response);
    const data = await firestore.collection("trips").add({
      uid: firebase.auth().currentUser.uid,
      destTitle: response.data.items[0].title,
      destination: new firebase.firestore.GeoPoint(response.data.items[0].position.lat, response.data.items[0].position.lng),
      departTime: new firebase.firestore.Timestamp.now()
    });
    dispatch({type: MAKE_TRIP, payload: data})
  };
};

export const editTrip = (payload) => { 
  //TODO edit trip in the database based on id
};

export const deleteTrip = (trip) => {
  var trips = firestore.collection("trips")
  return async (dispatch) => {
    try{
 const deleteTrip = trips.doc("OdmzUZ5JMuGntSbevVbH").delete();
 dispatch({type: DELETE_TRIP, payload: trip})
    }
catch (err) {
  console.error("Error removing document: ", err);
}
  }  
};
