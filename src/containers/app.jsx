import React, { Component } from "react";
/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import { fetchAlbums } from '../store/actions.js';

import Header from './header';
import Page from './page';

import Resize from './resize';

// Styles
import '../normalize.css';
import { StyleBase } from '../scss/_stylebase.scss';
import '../scss/layouts/_app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      minHeight: 'auto',
      deviceType: 'large'
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    albums: nextProps.albums,
    minHeight: nextProps.minHeight,
    deviceType: nextProps.deviceType
  });

  componentDidMount() {
    this.props.fetchAlbums();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.minHeight === nextProps.minHeight
           && this.state.deviceType === nextProps.deviceType;
  }

  render() {
    const { minHeight, deviceType, albums } = this.state;

    return (
      <div className="app">
        <Resize />
        <Header items={albums} deviceType={deviceType} />
        <Switch>
          {albums.map((item, index) => {
            return <Route
              exact={index > 0 ? false : true}
              key={index}
              path={item.path}
              component={props => <Page {...props}
                                    path={item.text}
                                    minHeight={minHeight}
                                  />}
            />
          })}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  albums: state.reducer.albums,
  minHeight: state.reducer.minHeight,
  deviceType: state.reducer.deviceType
});

const mapDispatchToProps = (dispatch) => ({
  fetchAlbums: () => dispatch(fetchAlbums())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
