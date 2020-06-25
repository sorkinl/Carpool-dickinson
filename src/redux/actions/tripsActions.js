import firebase from "../../firebase/firebaseConfig";
import { GET_TRIPS, MAKE_TRIP, DELETE_TRIP } from "../constants/trip-types";
import axios from "axios";
import { useFirestore } from 'react-redux-firebase'

const firestore = firebase.firestore();

// export function getTrips() {
//   //TODO retrieve trips from the database
//   var trips = firestore.collection("trips");
//   return async (dispatch, getState) => {
//     const getTrips = await trips.where("destination.longitude", "<=", 14).get();
//     dispatch({
//       type: GET_TRIPS,
//       payload: getTrips.docs.map((doc) => doc.data()),
//     });
//   };
// }
//check Redux dev to see geopoint (firebase)
// const firestore = useFirestore();
export const createTrip = (payload) => {
  //TODO put trip into the database
  return async (dispatch) => {
    try {
      const originSearch = encodeURIComponent(payload.originTitle);
      const destSearch = encodeURIComponent(payload.destTitle);

      const originRes = await axios.get(
          `https://geocode.search.hereapi.com/v1/geocode?q=${originSearch}&apiKey=${process.env.REACT_APP_HERE_KEY}`
      );
      const destRes = await axios.get(
          `https://geocode.search.hereapi.com/v1/geocode?q=${destSearch}&apiKey=${process.env.REACT_APP_HERE_KEY}`
      );
      console.log(originRes);
      console.log(destRes);
      const tripToAdd = {
          uid: firebase.auth().currentUser.uid,
          user: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            //photoURL:,
         },
          originTitle: originRes.data.items[0].title,
          origin: {
              latitude: originRes.data.items[0].position.lat,
              longitude: originRes.data.items[0].position.lng
          },
          destTitle: destRes.data.items[0].title,
          destination: {
              latitude: destRes.data.items[0].position.lat,
              longitude: destRes.data.items[0].position.lng
          },
          departDate: payload.departDate,
          departTime: payload.departTime,
          description: payload.description,
        }
        await firestore.collection("trips").add(tripToAdd);
        dispatch({type: MAKE_TRIP});
    } catch (err) {
      console.log("Create Trip error", err);
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
  // return async (dispatch) => {
  //   try {
  //     const search = encodeURI(payload);
  //     const response = await axios.get(
  //         `https://places.ls.hereapi.com/places/v1/autosuggest?apiKey=${process.env.REACT_APP_HERE_KEY}&q=${search}&at=40.202552,-77.196571&result_types=place&pretty`
  //     );
  //     console.log(response.data.results[0].title);
  //     // const data = await firestore.collection("trips").add({
  //     //   origin_title: response.data.items[0].title,
  //     // });
  //
  //   } catch (err) {
  //     console.log("Dickinson autosuggest dispatch error", err);
  //   }
  // };
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

