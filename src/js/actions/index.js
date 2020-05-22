import { LOGIN, FOUND_BAD_WORD } from "../constants/action-types";

export function toggleLogin(payload) {
    return { type: LOGIN, payload }
};