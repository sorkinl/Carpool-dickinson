import { REGISTER } from "../constants/users-types";


const initialState = {
  
}

export function userReducer(state = initialState, action) {
    switch(action.type){
        case REGISTER:
            return{

            }
        default:
            return state;
    }
    // if (action.type === REGISTER) {
    //   return {
    //       ...state,
    //       loggedIn: !state.loggedIn,
    //       word: action.payload.word
    //     }
    // }
   
  }
  
export default userReducer;