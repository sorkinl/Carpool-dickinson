import { LOGIN } from "../constants/auth-types";


const initialState = {
    loggedIn: false,
    word: ''
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === LOGIN) {
      return {
          ...state,
          loggedIn: !state.loggedIn,
          word: action.payload.word
        }
    }
    return state;
  }
  
  export default rootReducer;