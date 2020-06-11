import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import { authMiddleware } from "../middleware/authMiddleware";
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';

import { useDispatch } from "react-redux";
import { verifyUser } from '../actions/authActions';
import { getProfileData } from "../actions/profileActions";


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(authMiddleware, thunk, logger))
    );

store.dispatch(verifyUser());


export default store;
