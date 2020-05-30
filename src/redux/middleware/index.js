import { LOGIN } from "../constants/auth-types";

const forbiddenWords = ["spam", "money"];

export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      // do your stuff

      if (action.type === LOGIN) {
        console.log(action.payload.word);
        if (action.payload.word !== 'allowed') {
          return dispatch({ type: "FOUND_BAD_WORD" });
        }
      }
      return next(action);
    };
  };
}
