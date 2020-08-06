import firebase from "../../firebase/firebaseConfig";
import { GET_TRIPS, MAKE_TRIP, DELETE_TRIP } from "../constants/trip-types";
import axios from "axios";
import { useFirestore } from 'react-redux-firebase'

const firestore = firebase.firestore();

export function getTrips(payload){
    var trips = firestore.collection("trips")
    return async (dispatch, getState) => {
        if(payload.originTitle === '' && payload.destTitle !== ''){
           
            const text = payload.destTitle;
            const end = text.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
         
            const getTrips =  await trips
                .where('destTitle', '>=', text)
                .where('destTitle', '<', end)
                .get()
                .catch((e)=>{console.log(e)});

            const returnTrips = []
            getTrips.docs.map(doc => returnTrips.push(doc.data()))

            dispatch({type: GET_TRIPS, payload: returnTrips})
        }
        else if(payload.originTitle !== '' && payload.destTitle === ''){

            const text = payload.originTitle;
            const end = text.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
         
            const getTrips =  await trips
                .where('originTitle', '>=', text)
                .where('originTitle', '<', end)
                .get()
                .catch((e)=>{console.log(e)});

            const returnTrips = []
            getTrips.docs.map(doc => returnTrips.push(doc.data()))

            dispatch({type: GET_TRIPS, payload: returnTrips})
        }
        else if(payload.originTitle !== '' && payload.destTitle !== ''){

            const text1 = payload.destTitle;
            const end1 = text1.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));

            const text2= payload.originTitle;
            const end2 = text2.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));

            const getTrips =  await trips
                .where('destTitle', '==', text1)
                // .where('destTitle', '<', end1)
                .where('originTitle', '==', text2)
                // .where('originTitle', '<', end2)
                
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

