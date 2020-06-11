import { LOGIN, REGISTER } from "../constants/auth-types";
import { GET_TRIPS, POST_TRIP } from "../constants/trip-types";

const initialState = {
    trips:[]
  };

  function tripsReducer(state = initialState, action) {
    switch(action.type){
      case GET_TRIPS:
        return {
          ...state,
          trips: action.payload
        }
      case POST_TRIP:
        console.log(action.payload)
      default:
        return state
    }
  }

  export default tripsReducer;
