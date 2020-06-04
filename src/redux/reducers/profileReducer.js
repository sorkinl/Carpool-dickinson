import { REGISTER_SUCCESS } from "../constants/auth-types";

const initialState = {
    profileData:{}
  };

  function tripsReducer(state = initialState, action) {
    switch(action.type){
      case REGISTER_SUCCESS:
        return {
          ...state,
          profileData: action.payload
        }
      default:
        return state
    }
  }

  export default tripsReducer;
