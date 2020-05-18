import types from './types';

const INITIAL_STATE = {
  auth: false
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
    default: 
   
      return state;
      
        
    }
}


export default navBarReducer;