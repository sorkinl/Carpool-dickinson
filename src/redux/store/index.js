import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
// import { userMiddleware } from "../middleware/usersMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(authMiddleware, thunk, logger))
    );

export default store;
