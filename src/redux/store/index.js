import { createStore, applyMiddleware } from "redux";
// import rootReducer from "../reducers/rootReducer";
import rootReducer from "../reducers/authReducer";
// import { userMiddleware } from "../middleware/usersMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";

const store = createStore(
    rootReducer,
    applyMiddleware(authMiddleware)
    );

export default store;