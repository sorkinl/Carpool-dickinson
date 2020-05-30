import { combineReducers } from 'redux'
import authReducer from './authReducer'
import tripsReducer from './tripsReducer';
// import { firestoreReducer } from 'redux-firestore';
// import { firebaseReducer } from 'react-redux-firebase';

const rootReducer =  combineReducers({
    authReducer,
    tripsReducer
    // firestoreReducer,
    // firebaseReducer
})

export default rootReducer;
