import { LOGIN, REGISTER, LOGIN_SUCCESS, LOGIN_FAILURE } from "../constants/auth-types";

const initialState = {
    loggedIn: false,
    word: '',
    errorMessage: null,
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
        console.log(action.payload);
        return {
          ...state,
          loggedIn: !state.loggedIn,
          errorMessage: null,
        }
      case LOGIN_FAILURE:
        console.log("LogIn Failure");
        return {
          ...state,
          errorMessage: action.payload.message,
        }
      case REGISTER:
        return state
      default:
        return state
    }
  }



  export default authReducer;
