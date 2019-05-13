import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Menu, { MenuItem } from './components/menu';
import classNames from "classnames";

import { StyleBase } from './scss/_stylebase.scss';

import './scss/layouts/_layout.scss';

let browserHistory = Router.browserHistory;

const PAGES = {
  page1: {
    path: "/page1",
    link: "Section 1",
    content: "CONTENT 1"
  },
  page2: {
    path: "/page2",
    link: "Section 2",
    content: "CONTENT 2"
  },
  page3: {
    path: "/page3",
    link: "Section 3",
    content: "CONTENT 3"
  }
};

const ARR = Object.values(PAGES).sort((a,b)=>a>b);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: PAGES.page1
    };
  }

  switchPage(page) {
    this.setState({ page: page });
  }

  render() {
    return (
      <Router history={browserHistory}>
        <div className="page">
          <Menu>
            {ARR.map((item, index) => {
              return <MenuItem
                key={index}
                path={item.path}
                text={item.link}
                onClick={event => {
                  this.switchPage(item);
                }}
                className={this.state.page === item ? "page__menu--active" : ""}
              />
            })}
          </Menu>
          {ARR.map((item, index) => {
            return <Route
              key={index}
              path={item.path}
              component={Section}>
              <Section
                text={item.content}
                className={this.state.page === item ? "page__section--active" : ""}
              />
            </Route>
          })}
        </div>
      </Router>
    );
  }
}

class Section extends Component {
  render() {
    return (
      <section className={classNames("page__section", this.props.className)} >
        {this.props.text}
      </section>
    );
  }
}

export default App;
