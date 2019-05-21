import React, { Component } from "react";

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
      minHeight: window.innerHeight + 1 + 'px'
    };
    this.fetchUrl = process.env.REACT_APP_API_URL + "/albums/album" + this.props.id;
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
          });
        }
      );
  }

  render() {
    const { error, isLoaded, images, minHeight } = this.state;

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

export default Page;
