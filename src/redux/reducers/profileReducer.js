import { SAVE_UPDATE } from "../constants/profile-types";

const userInitState = {
      firstName: '',
      lastName: '',
      email: '',
      location: '',
      phoneNum: ''
    };

function profileReducer(state = userInitState, action) {
    switch(action.type) {
      case SAVE_UPDATE:
        return {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          location: action.payload.location,
          phoneNum: action.payload.phoneNum
        };
      default:
        return state;
    }
  }
