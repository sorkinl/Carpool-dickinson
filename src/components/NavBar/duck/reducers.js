import types from './types';

const INITIAL_STATE = {
  auth: false,
  accountIcon: false
}
const navBarReducer = (state=INITIAL_STATE, action) => {

  switch(action.type) {
    case types.LOGIN: {
      return {
        ...state,
        auth: true
         }
      }
    
    case types.LOGOFF: {
      return {
        ...state,
        auth: false
        }
    }
    
    case types.ON: {
      return {
        ...state,
        accountIcon: true
        }
    }

    case types.OFF: {
      return {
        ...state,
        aaccountIconuth: false
        }
    
        
}
    default: 
   
      return state;
      
        
    }
}


export default navBarReducer;