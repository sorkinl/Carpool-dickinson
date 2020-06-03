import {
  LOGIN,
  LOGIN_SUCCESS,
  SEND_EMAIL,
  REGISTER_SUCCESS,
  LOCAL_LOGIN,
  NO_LOCAL_LOGIN
} from "../constants/auth-types";
import firebase from "../../firebase/firebaseConfig";

//from firebase docs
//provides Firebase with instructions on how to construct email link
/* var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: 'http://localhost:3000/landingPage',
   
    // This must be true.
    handleCodeInApp: true,
    
    //below for mobile config

    // iOS: {
    //   bundleId: 'com.example.ios'
    // },
    // android: {
    //   packageName: 'com.example.android',
    //   installApp: true,
    //   minimumVersion: '12'
    // },
    // dynamicLinkDomain: "carpool-d.firebaseapp.com"
  }; */

export const toggleLogin = (payload) => {
  return { type: LOGIN, payload };
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

export const register = (payload) => {
  //TODO implement SIGN UP functionality
  const firestore = firebase.firestore();
  return async (dispatch) => {
    try {
      const response1 = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          payload.email,
          payload.password
        );
      const response2 = await firestore
        .collection("users")
        .doc(response1.user.uid)
        .set({
          firstName: payload.firstName,
          lastName: payload.lastName,
        });
      dispatch({ type: REGISTER_SUCCESS, payload: response2 });
    } catch (err) {
      console.log("dispatch error", err);
    }
  };
};

/* export const sendEmail = (payload) => {

      return async (dispatch) => {
        try{
           
            await firebase.auth().sendSignInLinkToEmail(payload.user.email, actionCodeSettings)
            window.localStorage.setItem('user', JSON.stringify(payload.user));
            dispatch({type:SEND_EMAIL, payload:payload.user})
        
        }
        catch (err){
            console.log('dispatch error', err);
        }
    }


}; */

/**
 * Verifies email after directed to the landingPage. Creates user in authentification
 * and in user database
 * @param {*} payload
 */
/* export const emailVerification = (payload)=>{
    
    const firestore=firebase.firestore();
    return async(dispatch)=>{
        const user = JSON.parse(window.localStorage.getItem("user"))
    
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            try{           
                const response1 =  await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
                const response2 = await firestore.collection("users").doc(response1.user.uid).set({
                    firstName:user.firstName,
                    lastName:user.lastName
                })
                window.localStorage.removeItem('user');
                dispatch({type:REGISTER_SUCCESS, payload:response2})
            }catch(err){
                console.log("err", err)
            }

        }
    }
} */

export const signIn = (payload) => {
  //TODO implement signIn
  return async (dispatch) => {
    const db = firebase.firestore();
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);
      dispatch({ type: LOGIN_SUCCESS, payload: response });
    } catch (err) {
      console.log("dispatch error", err);
    }
  };
};

export const registerSuccess = (response) => {
  //TODO call if the above register was successful
};
export const registerFail = (response) => {
  //TODO call if the above register was failed
};
export const signInSuccess = (response) => {
  //TODO call if the above sign in was successful
};
export const signInFail = (response) => {
  //TODO call if the above sign in failed
};
