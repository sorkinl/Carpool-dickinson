import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./sass/main.scss";
import { Provider } from "react-redux";
import store from "./redux/store";
import * as serviceWorker from "./serviceWorker";
import firebase from "./firebase/firebaseConfig";
import { useSelector } from "react-redux";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";
import Loading from "./components/Loading";
import "font-awesome/css/font-awesome.min.css";
// import HeaderBar from './components/Dashboard/HeaderBar';

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  const user = useSelector((state) => state.firebase.profile);
  if (!isLoaded(auth) && !isLoaded(user)) return <Loading />;
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <React.StrictMode>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
      </React.StrictMode>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
