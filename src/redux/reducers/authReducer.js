import { LOGIN } from "../constants/auth-types";


const initialState = {
    loggedIn: false,
    word: ''
  };
  
  function authReducer(state = initialState, action) {
   console.log(action.type)
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