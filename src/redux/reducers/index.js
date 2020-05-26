import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { profileReducer } from './profileReducer';

const rootReducer = combineReducers({
  authId: authReducer,
  proId: profileReducer
})

export default rootReducer;
