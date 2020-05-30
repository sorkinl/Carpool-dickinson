import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
// import { userMiddleware } from "../middleware/usersMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import thunk from 'redux-thunk';

const store = createStore(
    rootReducer,
    applyMiddleware(authMiddleware, thunk)
  
    );

export default store;
