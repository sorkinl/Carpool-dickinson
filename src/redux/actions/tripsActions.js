import firebase from '../../firebase/firebaseConfig'
import {GET_TRIPS} from '../constants/trip-types'

export  function getTrips () {
    //TODO retrieve trips from the database
    return async (dispatch, getState) => {
        const db = firebase.firestore();
        const getTrips =  await db.collection("testCollection").get();
        console.log(getTrips.docs.map(doc => doc.data()))
        dispatch({type: GET_TRIPS, payload: getTrips.docs.map(doc => doc.data())})
    }
    
    
}

export const createTrip = (payload) =>{
    //TODO put trip into the database
}

export const editTrip = (payload) =>{
    //TODO edit trip in the database based on id
}

export const deleteTrip = (payload) =>{
    //TODO delete trip from the database
}