import { combineReducers } from 'redux'
import authReducer from './authReducer'
import tripsReducer from './tripsReducer';
import profileReducer from './profileReducer';
import { firebaseReducer} from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'

const rootReducer =  combineReducers({
    authReducer,
    tripsReducer,
    profileReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
    
})

export default rootReducer;