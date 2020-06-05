
import { LOGIN, REGISTER,SEND_EMAIL, LOGIN_SUCCESS, LOCAL_LOGIN, NO_LOCAL_LOGIN, REGISTER_SUCCESS, VERIFY_FAILS,LOGOUT_SUCCESS, LOGOUT_ERROR, LOGIN_FAILURE } from "../constants/auth-types";


const initialState = {
    loggedIn: false,
    word: '',
    errorMessage: null,
    user:''
  };

  function authReducer(state = initialState, action) {
    switch(action.type){
      case LOGIN:
        return {
          ...state,
          loggedIn: !state.loggedIn,
          word: action.payload.word
        }
      case LOGIN_SUCCESS:
        return {
          ...state,
          loggedIn: true
        }
      case LOGIN_FAILURE:
        console.log("LogIn Failure");
        return {
          ...state,
          errorMessage: action.payload.message,
          loggedIn: false,
        }
      case REGISTER:
        return state
      case SEND_EMAIL:
         console.log("Register Reducer")
        return {
          ...state,
       
        }
      case REGISTER_SUCCESS:
        return {
          ...state,
          loggedIn: true
        }
      case VERIFY_FAILS:
        console.log('Session is out and the user is logged out')
        return {
          ...state,
          loggedIn: false
        }
      default:
        return state
    }
  }

  export default authReducer;
