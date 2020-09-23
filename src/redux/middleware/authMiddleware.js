import { REGISTER } from "../constants/auth-types";

  export function authMiddleware({ dispatch }) {


  return function(next) {
    return function(action) {
      if (action.type === REGISTER) {
          console.log("middleware")
      }
      return next(action);
    };
  };
}