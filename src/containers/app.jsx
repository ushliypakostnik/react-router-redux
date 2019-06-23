import React, { Component } from "react";
/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import { fetchAlbums } from '../store/actions';

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
      test: 0
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    albums: nextProps.albums
  });

  componentDidMount() {
    this.props.fetchAlbums();
    this.setState({
      test: 1
    });
  }

  render() {
    const { albums } = this.state;

    return (
      <div className="app">
        <Resize />
        <Header items={albums} />
        <Switch>
          {albums.map((item, index) => {
            return <Route
              exact={index > 0 ? false : true}
              key={index}
              path={item.path}
              component={props => <Page {...props} path={item.text} />}
            />
          })}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  albums: state.reducer.albums
});

const mapDispatchToProps = (dispatch) => ({
  fetchAlbums: () => dispatch(fetchAlbums())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
