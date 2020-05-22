import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import index from "./js/index";
import { Provider } from "react-redux";
import store from "./js/store/index";
import * as serviceWorker from './serviceWorker';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </Provider>
,
  document.getElementById('root')
);


// registerServiceWorker();
serviceWorker.unregister();
