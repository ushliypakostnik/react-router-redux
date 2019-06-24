import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchData } from '../store/actions';

import Album from '../components/album';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      images: []
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    error: nextProps.error,
    isLoaded: nextProps.isLoaded,
    images: nextProps.images,
    minHeight: nextProps.minHeight
  });

  componentDidMount() {
    this.props.fetchData(this.props.path);
  }

  render() {
    const { minHeight } = this.props;
    const { error, isLoaded, images } = this.state;

    if (error) {
      return <div className="app__page" style={{minHeight: minHeight}}>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="app__page" style={{minHeight: minHeight}}></div>;
    } else {
      return (
        <section className="app__page" style={{minHeight: minHeight}}>
          <Album photos={images} />
        </section>
      );
    }
  }
}

Page.propTypes = {
  path: PropTypes.string.isRequired,
  minHeight: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  isLoaded: !state.reducer.isFetching,
  error: state.reducer.error,
  images: state.reducer.data,
  minHeight: state.reducer.resize.minHeight
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: (path) => dispatch(fetchData(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
