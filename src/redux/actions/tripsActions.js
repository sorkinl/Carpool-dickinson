import firebase from "../../firebase/firebaseConfig";
import { GET_TRIPS, MAKE_TRIP, DELETE_TRIP, GET_TRIPS_BY_RADIUS } from "../constants/trip-types";
import {getMaxAndMinLat, getMaxAndMinLong} from "../../Utils/Distance"
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

export function getTripByRadius(payload){
    var trips = firestore.collection("trips")

    const lat = getMaxAndMinLat(50, payload.destCoord.lat)
    const long = getMaxAndMinLong(50, payload.destCoord.long, payload.destCoord.lat)
    
    console.log(lat)
    console.log(long)
    return async (dispatch, getState) => {

        const getTrips =  await trips
            .where('destination.latitude', '>=', lat.minLat)
            .where('destination.latitude', '<=', lat.maxLat)
            // .where('destination.longitude', '>=', long.minLong)
            // .where('destination.longitude', '<=', long.maxLong)
            .get()
            .catch((e)=>{console.log(e)});

        const returnTrips = []
        getTrips.docs.map(doc => returnTrips.push(doc.data()))

        dispatch({type: GET_TRIPS_BY_RADIUS, payload: returnTrips})
        

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

