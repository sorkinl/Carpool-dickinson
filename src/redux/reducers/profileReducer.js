import { REGISTER_SUCCESS } from "../constants/auth-types";
import { GET_DATA, GET_TRIPS_USER } from "../constants/profile-types";

const initialState = {
    profileData:{},
    userTrips:[]
  };

  function tripsReducer(state = initialState, action) {
    switch(action.type){
      case REGISTER_SUCCESS:
        return {
          ...state,
          profileData: action.payload
        }
      case GET_DATA:
        return {
          ...state,
          profileData: action.payload
        }
      case GET_TRIPS_USER:
        return {
          ...state,
          userTrips: action.payload
        }
      default:
        return state
    }
  }

  export default tripsReducer;
