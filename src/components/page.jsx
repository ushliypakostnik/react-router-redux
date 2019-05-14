import React, { Component } from "react";
import { fetch } from 'whatwg-fetch';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      images: []
    };
    this.contentUrl = "http://127.0.0.1:8082";
    this.fetchUrl = this.contentUrl + "/albums/album" + this.props.id;
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
      )
  }

  render() {
    const { error, isLoaded, images } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <section className="app__page" test={this.props.key}>
          {images.map((image, index) => (
            <img key={index} src={this.contentUrl + image[0]} />
          ))}
        </section>
      );
    }
  }
}

export default Page;
