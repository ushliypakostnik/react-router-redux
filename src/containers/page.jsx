import React, { Component } from "react";
import ReactDOM from "react-dom";
import { fetch } from 'whatwg-fetch';

import Album from '../components/album';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      images: [],
      windowHeight: props.windowHeight,
      minHeight: window.innerHeight + 1 + 'px',
      test: null
    };
    this.fetchUrl = "http://127.0.0.1:8082/albums/album" + this.props.id;
  }

  componentWillMount() {
    this.setState({
      windowHeight: window.innerHeight + 'px'
    });
  }

  componentDidMount() {
    const string = parseInt(this.state.windowHeight.replace('px', '')) + 1 + 'px';
    if (typeof(string) != undefined) {
      this.setState({
        minHeight: string
      });
    }
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
    const { error, isLoaded, images, minHeight } = this.state;

    if (error) {

      return <div className="app__page" style={{minHeight: this.state.minHeight}}>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="app__page" style={{minHeight: this.state.minHeight}}></div>;
    } else {
      return (
        <section className="app__page" style={{minHeight: this.state.minHeight}}>
          <Album photos={images} />
        </section>
      );
    }
  }
}

export default Page;
