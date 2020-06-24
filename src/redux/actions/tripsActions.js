import firebase from "../../firebase/firebaseConfig";
import { GET_TRIPS, MAKE_TRIP, DELETE_TRIP } from "../constants/trip-types";
import axios from "axios";

const firestore = firebase.firestore();
export function getTrips(payload) {

  var trips = firestore.collection("trips")
  return async (dispatch, getState) => {


      if(payload.originTitle === '' && payload.destTitle !== ''){

          const getTrips =  await trips.where('destTitle', "==", payload.destTitle)
            .get()
            .catch((e)=>{console.log(e)});

          const returnTrips = []
          getTrips.docs.map(doc => returnTrips.push(doc.data()))
        
        dispatch({type: GET_TRIPS, payload: returnTrips})
      }
      else if(payload.originTitle !== '' && payload.destTitle === ''){

          const getTrips =  await trips.where('originTitle', "==", payload.originTitle)
            .get()
            .catch((e)=>{console.log(e)});

          const returnTrips = []
          getTrips.docs.map(doc => returnTrips.push(doc.data()))
          
          dispatch({type: GET_TRIPS, payload: returnTrips})
      }
      else if(payload.originTitle !== '' && payload.destTitle !== ''){

        const getTrips =  await trips
            .where('originTitle', "==", payload.originTitle)
            .where('destTitle', "==", payload.destTitle)
            .get()
            .catch((e)=>{console.log(e)});

          const returnTrips = []
          getTrips.docs.map(doc => returnTrips.push(doc.data()))
          
          dispatch({type: GET_TRIPS, payload: returnTrips})

      }

    
    }
}
export const createTrip = (payload) => {
  //TODO put trip into the database

  return async (dispatch) => {
    try {
      const search = encodeURIComponent(payload.pickup);
      const response = await axios.get(
          `https://geocode.search.hereapi.com/v1/geocode?q=${search}&apiKey=${process.env.REACT_APP_HERE_KEY}`
      );
      console.log(response);
      const data = await firestore.collection("trips").add({
        uid: firebase.auth().currentUser.uid,
        //name, email, phonenum using currentUser
        //originTitle: response
        destTitle: response.data.items[0].title,
        destination: new firebase.firestore.GeoPoint(
            response.data.items[0].position.lat,
            response.data.items[0].position.lng
        ),
        departTime: new firebase.firestore.Timestamp.now(),
      });
      dispatch({type: MAKE_TRIP, payload: data});
    } catch (err) {
      console.log("MAKE_TRIP dispatch error", err);
    }
  };
}
// var objectConstructor = ({}).constructor;
// function isObject(obj)
// {
//   if (obj.constructor === objectConstructor) {
//     return "Object";
//   }
// }

export const autoSuggest = (payload) => {
  return async (dispatch) => {
    try {
      const search = encodeURI(payload);
      const response = await axios.get(
          `https://places.ls.hereapi.com/places/v1/autosuggest?apiKey=${process.env.REACT_APP_HERE_KEY}&q=${search}&at=40.202552,-77.196571&result_types=place&pretty`
      );
      console.log(response.data.results[0].title);
      // const data = await firestore.collection("trips").add({
      //   origin_title: response.data.items[0].title,
      // });

    } catch (err) {
      console.log("Dickinson autosuggest dispatch error", err);
    }
  };
}

//payload.uid
//https://stackoverflow.com/questions/49682327/how-to-update-a-single-firebase-firestore-document
export const editTrip = (payload, id) => {
  //TODO edit trip in the database based on id
  var trips = firestore.collection("trips");
  console.log(trips.doc('NZ07glQhOvTZ9tkn7XZI'));
  console.log(id);
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

