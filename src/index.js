import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { browserHistory } from "react-router";
//import { createBrowserHistory } from "history";
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import App from './components/app';
import Header from './components/header';
import Page from './components/page';

import './normalize.css';
import { StyleBase } from './scss/_stylebase.scss';
import './scss/layouts/_app.scss';

import * as serviceWorker from './serviceWorker';

import { pageActive } from './actions'
import reducer from './reducers'

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

const store = createStore(
  combineReducers({
    reducer,
    routing: routerReducer
  })
);
console.log("Store", store.getState());

store.subscribe(() => {
  console.info("State has changed: "  + store.getState());
});

//const history = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, store);
//history.listen(location => console.info('-> location:', location));

store.dispatch({type: "PAGEACTIVE", page: ARR[0]});
store.dispatch(pageActive(ARR[1]));

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <App items={ARR}>
        <Switch>
          {ARR.map((item, index) => {
            return <Route
              exact={index > 0 ? false : true}
              key={index}
              path={item.path}
              component={props => <Page {...props} id={(index + 1)} />}
            />
          })}
        </Switch>
      </App>
    </Router>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
