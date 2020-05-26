import { LOGIN } from "../constants/auth-types";

const authInitState = {
    loggedIn: false,
    word: '',
  };


function authReducer(state = authInitState, action) {
    if (action.type === LOGIN) {
      return {
          ...state,
          loggedIn: !state.loggedIn,
          word: action.payload.word
        }
    }
    return state;
}


export default authReducer;
