import { LOGIN, FOUND_BAD_WORD, REGISTER } from "../constants/auth-types";

export function toggleLogin(payload) {
  
    return { type: LOGIN, payload }
};

export function register(payload) {
    console.log(payload)
    return { type: REGISTER, payload }
};