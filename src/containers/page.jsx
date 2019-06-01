import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';

import { fetch } from 'whatwg-fetch';

import Album from '../components/album';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      images: []
    };
    this.fetchUrl = process.env.REACT_APP_API_URL + "/albums/" + this.props.path;
  }

  componentDidMount() {
    fetch(this.fetchUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            images: result
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

export default Page;
