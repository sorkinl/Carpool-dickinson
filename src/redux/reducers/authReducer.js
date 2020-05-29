import { LOGIN, REGISTER } from "../constants/auth-types";

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
      case REGISTER:
        return state
      default:
        return state
    }
  }

  export default authReducer;
