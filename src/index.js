import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from './containers/app';

import * as serviceWorker from './serviceWorker';

import store, { history } from './store/store.js'

// Styles
import './normalize.css';
import { StyleBase } from './scss/_stylebase.scss';
import './scss/layouts/_app.scss';

const PAGES = {
  page1: {
    path: "/",
    link: "pinhole"
  },
  page2: {
    path: "/album2",
    link: "wedding"
  },
  page3: {
    path: "/album3",
    link: "concert"
  }
};

const ARR = Object.values(PAGES).sort((a,b)=>a>b);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <App items={ARR} />
    </Router>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
