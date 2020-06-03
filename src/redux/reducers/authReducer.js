import { LOGIN, REGISTER, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_ERROR } from "../constants/auth-types";

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
          loggedIn: true,
        }
        case LOGOUT_SUCCESS:
          return{
            ...state,
            loggedIn: false,
          }
      case REGISTER:
        return state
      default:
        return state
    }
  }



  export default authReducer;
