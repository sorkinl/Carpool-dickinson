import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import { authMiddleware } from "../middleware/authMiddleware";
import thunk from 'redux-thunk';

const store = createStore(
    rootReducer,
    applyMiddleware(authMiddleware, thunk)
    );

export default store;
