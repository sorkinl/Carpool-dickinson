import { REGISTER } from "../constants/auth-types";

const userJSON = JSON.parse(JSON.stringify("../../json/users.JSON"))
  
export function authMiddleware({ dispatch }) {


  return function(next) {
    return function(action) {

      // do your stuff
      if (action.type === REGISTER) {
        if(Object.keys(userJSON).some(email => 
              console.log(email)
            // email === action.payload.user.email
            )){

            console.log("contains")
        }else{
            console.log("doesn't contain")
        }
   

        // if (action.payload.word !== 'allowed') {
        //   return dispatch({ type: "FOUND_BAD_WORD" });
        // }
      }
      return next(action);
    };
  };
}

// Object.keys(JSON).some("")