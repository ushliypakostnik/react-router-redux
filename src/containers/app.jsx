import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { fetch } from 'whatwg-fetch';

import Page from './page';

import Header from '../components/header';

// Styles
import '../normalize.css';
import { StyleBase } from '../scss/_stylebase.scss';
import '../scss/layouts/_app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      panelOpen: false
    };
    this.fetchUrl = process.env.REACT_APP_API_URL + "/albums/";
  }

  componentDidMount() {
    fetch(this.fetchUrl)
      .then(res => res.json())
      .then(
        (result) => {
          let resultArr = [];
          result.map((item, index) => {
            if (index === 0) {
              resultArr.push({text: item, path: "/"});
            } else {
              resultArr.push({text: item, path: "/album" + (index + 1)});
            }
          })
          this.setState({
            isLoaded: true,
            albums: resultArr
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    return (
      <div className="app">
        <Header items={this.state.albums} />
        <Switch>
          {this.state.albums.map((item, index) => {
            return <Route
              exact={index > 0 ? false : true}
              key={index}
              path={item.path}
              component={props => <Page {...props} id={(index + 1)} />}
            />
          })}
        </Switch>
      </div>
    );
  }
}

export default App;
