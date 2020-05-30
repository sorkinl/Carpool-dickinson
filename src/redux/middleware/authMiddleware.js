import { REGISTER } from "../constants/auth-types";

  export function authMiddleware({ dispatch }) {


  return function(next) {
    return function(action) {

        
      // do your stuff
      if (action.type === REGISTER) {
    
          console.log("middleware")
      }
      return next(action);
    };
  };
}

// Object.keys(JSON).some("")