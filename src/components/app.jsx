import React, { Component } from "react";

import Header from './header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panelOpen: false
    };
    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel(data) {
    if (data) {
      this.setState({panelOpen: true});
    } else {
      this.setState({panelOpen: false});
    }
  }

  render() {
    return (
      <div className={this.state.panelOpen ? "app app--panel-open" : "app"}>
        <Header togglePanel={this.togglePanel} items={this.props.items} />
        {this.props.children}
      </div>
    );
  }
}

export default App;
