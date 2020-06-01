import { LOGIN, LOGIN_SUCCESS, REGISTER, REGISTER_SUCCESS, SAVE_USER_INFO } from "../constants/auth-types";
import firebase from '../../firebase/firebaseConfig';

export const toggleLogin = (payload) => {
    return { type: LOGIN, payload }
};

/**
 * Registers the user into the Authentification database. If it's sucessful, dispatches saveUserInfo.
 */
export const register = (payload) => {

     const firestore=firebase.firestore();
      return async (dispatch) => {
        try{
            const response1 =  await firebase.auth().createUserWithEmailAndPassword(payload.user.email, payload.user.password);
            console.log(response1)
            console.log()
            const response2 = await firestore.collection("users").doc(response1.user.uid).set({
                firstName:payload.user.firstName,
                lastName:payload.user.lastName
            })
            dispatch({type:REGISTER_SUCCESS, payload:response2})
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
