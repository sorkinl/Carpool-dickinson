import { LOGIN, REGISTER } from "../constants/auth-types";
import { GET_TRIPS, MAKE_TRIP, GET_TRIPS_USER, DELETE_TRIP ,GET_TRIPS_BY_RADIUS, SEARCH_PROPS} from "../constants/trip-types";

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
      case MAKE_TRIP:
        console.log(action.payload)
      case DELETE_TRIP:
        return {
          trips: [
            ...state.trips.filter(trip => trip !== action.payload)
          ]
        }
      case GET_TRIPS_BY_RADIUS:
        return {
          ...state,
          trips: action.payload
        }
      case SEARCH_PROPS:
        return{
          ...state,
          searchProps:action.payload
        }

      default:
        return state
    }
  }

  export default tripsReducer;
