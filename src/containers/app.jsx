import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import Page from './page';

import Header from '../components/header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      panelOpen: false
    };
    this.fetchUrl = "http://127.0.0.1:8082/albums/";
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

const mapStateToProps = function(state, ownProps) {
  console.log("State: ", state.reducer.page.path, "ownProps: ", ownProps.items);
  return {
    page: state.reducer.page.path
  }
}

export default connect(mapStateToProps)(App);
