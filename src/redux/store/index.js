import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import { authMiddleware } from "../middleware/authMiddleware";


const store = createStore(
    rootReducer,
    applyMiddleware(authMiddleware)
    );

export default store;
