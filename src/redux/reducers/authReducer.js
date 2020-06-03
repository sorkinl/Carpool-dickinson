import { LOGIN, SEND_EMAIL, LOGIN_SUCCESS } from "../constants/auth-types";

const initialState = {
    loggedIn: false,
    word: '',
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
        console.log(action.payload);
        return {
          ...state,
          loggedIn: true,
        }
      case SEND_EMAIL:
         console.log("Register Reducer")
        return {
          ...state,
       
        }
      default:
        return state
    }
  }

  export default authReducer;
