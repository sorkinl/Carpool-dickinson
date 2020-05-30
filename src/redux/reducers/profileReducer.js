import { CREATE_PROFILE } from '../constants/profile-types';

const initState = {
  users: []
}

function profileReducer(state = initState, action){
  switch(action.type){
    case CREATE_PROFILE:
      console.log("successfully created profile", action.user)
      return state;
    default:
      return state;
  }
}

export default profileReducer;
