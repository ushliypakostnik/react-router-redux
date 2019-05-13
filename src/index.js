import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import Menu, { MenuItem } from './components/menu';
import Page1 from './components/page1';
import Page2 from './components/page2';
import Page3 from './components/page3';

import './normalize.css';
import { StyleBase } from './scss/_stylebase.scss';
import './scss/layouts/_layout.scss';

import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();

const PAGES = {
  page1: {
    path: "/page1",
    link: "Section 1"
  },
  page2: {
    path: "/page2",
    link: "Section 2"
  },
  page3: {
    path: "/page3",
    link: "Section 3"
  }
};

ReactDOM.render((
  <Router history={history}>
    <div className="app">
      <Menu>
        <MenuItem path={PAGES.page1.path} text={PAGES.page1.link} />
        <MenuItem path={PAGES.page2.path} text={PAGES.page2.link} />
        <MenuItem path={PAGES.page3.path} text={PAGES.page3.link} />
      </Menu>
      <Route path={PAGES.page1.path} component={Page1} />
      <Route path={PAGES.page2.path} component={Page2} />
      <Route path={PAGES.page3.path} component={Page3} />
    </div>
  </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
