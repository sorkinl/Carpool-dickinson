import { LOGIN, FOUND_BAD_WORD, REGISTER } from "../constants/auth-types";

export const toggleLogin = (payload) => {
  
    return { type: LOGIN, payload }
};

export const register = (payload) => {
    //TODO implement SIGN UP functionality
    
};

export const signIn = (payload) => {
    //TODO implement signIn
    
};

export const registerSuccess = (response) =>{
    //TODO call if the above register was successful
}
export const registerFail = (response) =>{
    //TODO call if the above register was failed
}
export const signInSuccess = (response) =>{
    //TODO call if the above sign in was successful
}
export const signInFail = (response) =>{
    //TODO call if the above sign in failed
}


