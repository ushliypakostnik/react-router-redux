import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import Header from './components/header';
import Page from './components/page';

import './normalize.css';
import { StyleBase } from './scss/_stylebase.scss';
import './scss/layouts/_app.scss';

import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();

const PAGES = {
  page1: {
    path: "/album1",
    link: "Section 1"
  },
  page2: {
    path: "/album2",
    link: "Section 2"
  },
  page3: {
    path: "/album3",
    link: "Section 3"
  }
};

const ARR = Object.values(PAGES).sort((a,b)=>a>b);

ReactDOM.render((
  <Router history={history}>
    <div className="app">
      <Header items={ARR} />
      <Switch>
        {ARR.map((item, index) => {
          return <Route
            key={index}
            path={item.path}
            component={props => <Page {...props} id={(index + 1)} />}
          />
        })}
      </Switch>
    </div>
  </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
