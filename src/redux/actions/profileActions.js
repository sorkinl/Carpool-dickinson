import firebase from "../../firebase/firebaseConfig";
import { GET_DATA } from "../constants/profile-types";
export const getProfileData = (payload) =>{
    return async (dispatch) => {
        const firestore = firebase.firestore();
    const user = firebase.auth().currentUser;
    const profileData = await firestore.collection("users").doc(user.uid).get();  
    dispatch({type: GET_DATA, payload: profileData.data()})
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
