import {
  LOGIN,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  VERIFY_FAILS,
  LOGOUT_SUCCESS,
  LOGIN_FAILURE,
} from "../constants/auth-types";
import firebase from "../../firebase/firebaseConfig";
import { getProfileData } from "./profileActions";

var actionCodeSettings = {
  url: "http://localhost:3000/",
  handleCodeInApp: true,
};

export const toggleLogin = (payload) => {
  return { type: LOGIN, payload };
};

export const verifyUser = () => {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: LOGIN_SUCCESS, payload: user.uid });
        dispatch(getProfileData());
      } else {
        dispatch({ type: VERIFY_FAILS });
      }
    });
  };
};

/**
 * Registers the user, sends verification email and makes a database for the user profile in firestore.
 * Catches any error that happens within the block of awaits. If no errors dispatches an action
 * of REGISTER_SUCCESS with payload of user, without password
 * @param {*} payload - User that is passed from SignUp component
 */
export const register = (payload) => {
  const firestore = firebase.firestore();
  const profile = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    status: 1,
  };
  return async (dispatch) => {
    try {
      const createUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password);

      await firebase
        .auth()
        .currentUser.sendEmailVerification(actionCodeSettings);
      await firestore.collection("users").doc(createUser.user.uid).set({
        profile,
      });
      dispatch({ type: REGISTER_SUCCESS, payload: profile });
    } catch (err) {
      console.log("dispatch error", err);
    }
  };
};

export const signIn = (payload) => {
  return async (dispatch) => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);
      dispatch({ type: LOGIN_SUCCESS });
    } catch (err) {
      dispatch({ type: LOGIN_FAILURE, payload: err });
      console.log("dispatch error", err);
    }
  };
};

export const logOut = (payload) => {
  return async (dispatch) => {
    try {
      const response = await firebase.auth().signOut();
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (err) {
      console.log("dispatch error", err);
    }
  };
};
