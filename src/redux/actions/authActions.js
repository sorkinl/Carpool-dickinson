import { LOGIN, LOGIN_SUCCESS, FOUND_BAD_WORD, REGISTER } from "../constants/auth-types";
import firebase from '../../firebase/firebaseConfig';

export const toggleLogin = (payload) => {

    return { type: LOGIN, payload }
};

/**
 * Ask reducer file. Success and Fail should be defined as type also.
 */
export const register = (payload) => {
    //TODO implement SIGN UP functionality

};

export const verifyUser = () => {
   return (dispatch) => {
    firebase.auth().onAuthStateChanged(user => {
        if(user){
          dispatch({type: LOGIN_SUCCESS});
        } else {
            dispatch({type: REGISTER});
        }
      });
   }
}


export const signIn = (payload) => {
    // console.log(payload);
    // return function(dispatch) {
    //     firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
    //     .then(() => {
    //         return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    //         .then((response) => {
    //             dispatch({type: LOGIN_SUCCESS, payload: response});
    //         })
    //     })
    //     .catch((err) => {
    //         console.log('dispatch error', err);
    //     })
    // }
    //TODO implement signIn
    return async (dispatch) => {
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
