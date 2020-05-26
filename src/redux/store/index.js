import { createStore, applyMiddleware } from "redux";
import authReducer from "../reducers/authReducers";
import { forbiddenWordsMiddleware } from "../middleware";


const store = createStore(
    authReducer,
    applyMiddleware(forbiddenWordsMiddleware)
);

export default store;
