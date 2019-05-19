import React, { Component } from "react";
import { connect } from 'react-redux';

import Header from './header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panelOpen: false
    };
  }

  render() {
    return (
      <div className="app">
        <Header items={this.props.items} />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  console.log("State: ", state.reducer, "ownProps: ", ownProps.items[0]);
  return {
  }
}

export default connect(mapStateToProps)(App);
