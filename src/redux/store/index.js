import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import { authMiddleware } from "../middleware/authMiddleware";
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import { verifyUser } from '../actions/authActions';


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(authMiddleware, thunk, logger))
    );

store.dispatch(verifyUser());


export default store;
