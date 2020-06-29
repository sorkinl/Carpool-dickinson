import firebase from "../../firebase/firebaseConfig";
import { GET_TRIPS, MAKE_TRIP, DELETE_TRIP } from "../constants/trip-types";
import axios from "axios";
import { useFirestore } from 'react-redux-firebase'

const firestore = firebase.firestore();

export function getTrips(payload){
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

