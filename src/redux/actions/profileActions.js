import firebase from "../../firebase/firebaseConfig";
import { GET_DATA, GET_TRIPS_USER } from "../constants/profile-types";
const firestore = firebase.firestore();
export const getProfileData = (payload) =>{
    return async (dispatch, getState) => {
        
    const user = firebase.auth().currentUser;
    const profileData = await firestore.collection("users").doc(user.uid).get();  
    dispatch({type: GET_DATA, payload: profileData.data()})
    } 

}
export function getTripsByUser(){
    var user = firebase.auth().currentUser;
    var trips = firestore.collection("trips")
    
    return async (dispatch, getState ) => {
        console.log(getState().authReducer.user)
      const getTrips = await trips.where('uid', "==", user.uid).get();
      dispatch({type: GET_TRIPS_USER, payload: getTrips.docs.map(doc => doc.data())})
    }
  }

export const updateProfile = (payload) =>{
    //TODO update profile info in the database
}

export const deleteProfile = (payload) =>{
    //TODO remove record in case account is deleted
}

export const createProfile = (payload) =>{
    //create profile when the user is registered
}
