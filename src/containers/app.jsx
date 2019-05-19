import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import Page from './page';

import Header from '../components/header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panelOpen: false
    };
  }

  render() {
    console.log(this.props.page);

    return (
      <div className="app">
        <Header items={this.props.items} />
        <Switch>
          {this.props.items.map((item, index) => {
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
