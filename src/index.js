import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import * as serviceWorker from './serviceWorker';
import 'leaflet/dist/leaflet.css'

import configureStore from 'store/store'

const store = configureStore()

ReactDOM.render(
  React.createElement(App, {
    store,
  }),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
