import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
// redux-logger is a middleware that lets you log every state change
import logger from 'redux-logger';
// redux-thunk is a middleware that lets you dispatch async actions
import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware
} from 'redux';
import rootReducer from './reducers';
// import rootReducer from'./components/common/NavBar/duck/reducers'
// import registerServiceWorker from './registerServiceWorker';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);
// const store = createStore(rootReducer);
// console.log(store.getState())
ReactDOM.render(
  <Provider store = {store}>

 
    <React.StrictMode>
      <App />
    </React.StrictMode>

  </Provider>,
  document.getElementById('root')
);


// registerServiceWorker();
serviceWorker.unregister();
