import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/store";
import * as serviceWorker from './serviceWorker';
// import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase/firebaseConfig';
import {useSelector} from 'react-redux'
import {createFirestoreInstance} from 'redux-firestore';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase'
import Loading from './components/Loading';
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}
firebase.firestore()
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

function AuthIsLoaded({children}){
  const auth = useSelector(state => state.firebase.auth)
  if(!auth.isLoaded) return <Loading/>;
  return children
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
    </Provider>
,
  document.getElementById('root')
);


// registerServiceWorker();
serviceWorker.unregister();
