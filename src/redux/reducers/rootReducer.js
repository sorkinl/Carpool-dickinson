import { combineReducers } from 'redux'
import authReducer from './authReducer'
import tripsReducer from './tripsReducer';
import profileReducer from './profileReducer';

const rootReducer =  combineReducers({
    authReducer,
    tripsReducer,
    profileReducer
})

export default rootReducer;