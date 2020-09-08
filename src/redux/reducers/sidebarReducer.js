import { 
    AT_HOME, 
    AT_CHAT, 
    AT_MY_TRIPS 
} from "../constants/sidebar-types";

const initialState = {
    currLocation: ""
};

function sidebarReducer(state = initialState, action) {
    switch(action.type){
      case AT_HOME:
        console.log("reducer: " + action.type);
        return {
          ...state,
          currLocation: action.payload
        }
      case AT_CHAT:
        console.log("reducer: " + action.type);
        return {
            ...state,
            currLocation: action.payload
          }
      case AT_MY_TRIPS:
        console.log("reducer: " + action.type);
        return {
            ...state,
          currLocation: action.payload
        }
      default:
        return state
    }
  }

  export default sidebarReducer;