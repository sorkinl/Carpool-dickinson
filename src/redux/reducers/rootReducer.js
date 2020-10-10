import { combineReducers } from 'redux'
import authReducer from './authReducer'
import tripsReducer from './tripsReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';
import { firebaseReducer} from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'
const rootReducer =  combineReducers({
    authReducer,
    tripsReducer,
    profileReducer,
    sidebarReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
    
})

export default rootReducer;