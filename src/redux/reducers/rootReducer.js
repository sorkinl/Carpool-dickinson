import { combineReducers } from 'redux'
import authReducer from './authReducer'
import tripsReducer from './tripsReducer';

const rootReducer =  combineReducers({
    authReducer,
    tripsReducer,

})

export default rootReducer;
