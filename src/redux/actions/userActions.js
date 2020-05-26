import { REGISTER } from "../constants/users-types";

export function register(payload) {
    console.log(payload)
    return { type: REGISTER, payload }
};

// export const userActions = {
//     register
// };
