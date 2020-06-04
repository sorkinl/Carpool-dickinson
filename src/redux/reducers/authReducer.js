import { LOGIN, REGISTER,SEND_EMAIL, LOGIN_SUCCESS, LOCAL_LOGIN, NO_LOCAL_LOGIN, REGISTER_SUCCESS,LOGOUT_SUCCESS, LOGOUT_ERROR } from "../constants/auth-types";


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
        case LOGOUT_SUCCESS:
          return{
            ...state,
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
      default:
        return state
    }
  }

  export default authReducer;
