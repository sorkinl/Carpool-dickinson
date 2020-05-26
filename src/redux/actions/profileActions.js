import {SAVE_UPDATE} from '../constants/profile-types';

export function saveUpdate(payload) {
    return { type: SAVE_UPDATE, payload}
};
