import React, { Component } from "react";

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
      <div className={this.state.panelOpen ? "app app--panel-open" : "app"}>
        <Header items={this.props.items} />
        {this.props.children}
      </div>
    );
  }
}

export default App;
