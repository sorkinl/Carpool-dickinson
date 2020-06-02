import { LOGIN, REGISTER, LOGIN_SUCCESS, LOCAL_LOGIN, NO_LOCAL_LOGIN } from "../constants/auth-types";

const initialState = {
    loggedIn: false,
    word: '',
    user: null
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
      case REGISTER:
        return state
      case LOCAL_LOGIN:
        return {
          ...state,
          loggedIn: true,
          user: action.payload
        }
      case NO_LOCAL_LOGIN:
        return {
          ...state,
          loggedIn: false,
          user: null
        }
      default:
        return state
    }
  }



  export default authReducer;
