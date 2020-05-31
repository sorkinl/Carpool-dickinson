import { LOGIN, LOGIN_SUCCESS, REGISTER, REGISTER_SUCCESS } from "../constants/auth-types";
import firebase from '../../firebase/firebaseConfig';

export const toggleLogin = (payload) => {
    return { type: LOGIN, payload }
};

/**
 * Ask reducer file. Success and Fail should be defined as type also.
 */
export const register = (payload) => {
 
    console.log(payload)
      return async (dispatch) => {
        try{
            const response =  await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
            dispatch({type: REGISTER_SUCCESS, payload: response});
        }
        catch (err){
            console.log('dispatch error', err);
        }
    }

};

export const signIn = (payload) => {
    //TODO implement signIn
    return async (dispatch) => {
        const db = firebase.firestore();
        try{
            const response =  await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
            dispatch({type: LOGIN_SUCCESS, payload: response});
        }
        catch (err){
            console.log('dispatch error', err);
        }
    }
};

export const registerSuccess = (response) =>{
    //TODO call if the above register was successful
}
export const registerFail = (response) =>{
    //TODO call if the above register was failed
}
export const signInSuccess = (response) =>{
    //TODO call if the above sign in was successful
}
export const signInFail = (response) =>{
    //TODO call if the above sign in failed
}
