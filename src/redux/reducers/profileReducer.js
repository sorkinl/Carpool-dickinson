import { CREATE_PROFILE } from '../constants/profile-types';

const initState = {
  users: []
}

function profileReducer(state = initState, action){
  switch(action.type){
    case CREATE_PROFILE:
      console.log("successfully created profile", action.payload)
      return state;
      //to be further edited
    default:
      return state;
  }
}

export default profileReducer;
