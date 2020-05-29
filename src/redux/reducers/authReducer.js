import { LOGIN, REGISTER, LOGIN_SUCCESS } from "../constants/auth-types";

const initialState = {
    loggedIn: false,
    word: '',
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
        }
      case REGISTER:
        return state
      default:
        return state
    }
  }



  export default authReducer;
