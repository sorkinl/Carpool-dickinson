import { LOGIN, FOUND_BAD_WORD } from "../constants/auth-types";

export function toggleLogin(payload) {
    return { type: LOGIN, payload }
};