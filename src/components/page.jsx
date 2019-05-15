import React, { Component } from "react";
import { fetch } from 'whatwg-fetch';

import Album from './album';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      images: []
    };
    this.fetchUrl = "http://127.0.0.1:8082/albums/album" + this.props.id;
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
          })
        }
      );
  }

  render() {
    const { error, isLoaded, images } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <section className="app__page">
          <Album photos={images} />
        </section>
      );
    }
  }
}

export default Page;
