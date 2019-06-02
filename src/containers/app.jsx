import React, { Component } from "react";
/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* eslint-disable no-unused-vars */
import { render } from 'react-dom';
import ReactResizeDetector from 'react-resize-detector';
import { fetch } from 'whatwg-fetch';

import Header from './header';
import Page from './page';

import Resize from '../components/resize';
import ScreenHelper from '../js/screen-helper';

// Styles
import '../normalize.css';
import { StyleBase } from '../scss/_stylebase.scss';
import '../scss/layouts/_app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      minHeight: this.getMinHeight()
    };
    this.fetchUrl = process.env.REACT_APP_API_URL + "/albums/";
  }

  getMinHeight = () => {
    if (ScreenHelper.getScrollbarWidth() > 0) {
      return window.innerHeight - 50 + 'px';
    } else {
      return 'auto';
    }
  }

  componentDidMount() {
    fetch(this.fetchUrl)
      .then(res => res.json())
      .then(
        (result) => {
          /* eslint-disable array-callback-return */
          let resultArr = [];
          result.map((item, index) => {
            if (index === 0) {
              resultArr.push({text: item.name, path: "/"});
            } else {
              resultArr.push({text: item.name, path: "/" + item.id});
            }
          })
          this.setState({
            albums: resultArr
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ((this.state.minHeight === 'auto' && nextState.minHeight != 'auto') ||
        (nextState.minHeight === 'auto' && this.state.minHeight != 'auto')) {
      return true;
    } else {
      return this.state.minHeight === nextState.minHeight;
    }
  }

  render() {
    const { albums, minHeight } = this.state;

    return (
      <div className="app">
        <Resize>
          <ReactResizeDetector handleHeight onResize={this.onResize} />
        </Resize>
        <Header items={albums} />
        <Switch>
          {albums.map((item, index) => {
            return <Route
              exact={index > 0 ? false : true}
              key={index}
              path={item.path}
              component={props => <Page {...props} path={item.text} minHeight={minHeight} />}
            />
          })}
        </Switch>
      </div>
    );
  }

  onResize = () => {
    this.setState({ minHeight: this.getMinHeight() });
  }
}

export default App;
