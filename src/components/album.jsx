import React, { Component, Fragment } from "react";

import Gallery from 'react-photo-gallery';
import LightboxContainer from './lightbox';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentImage: 0,
      lightboxData: [],
      lightboxIsOpen: false
    };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.lightboxUpdate = this.lightboxUpdate.bind(this);
    this.overlayKey = 0;
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }
  componentWillMount() {
    let lightboxDataArr = Object.values(this.props.photos);
    let result = [];
    lightboxDataArr.forEach(function(data) {
      result.push(Object.values(data)[0]);
    });
    this.setState({
      lightboxData: result
    });
  }
  lightboxUpdate(data) {
    if (!data) {
      this.closeLightbox();
    }
  }
  render() {
    ++this.overlayKey;

    return (
      <Fragment>
        <Gallery
          photos={this.props.photos}
          margin={0}
          targetRowHeight={350}
          onClick={this.openLightbox} />
        {this.state.lightboxIsOpen && (
          <LightboxContainer
            key={this.overlayKey}
            images={this.state.lightboxData}
            index={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
            lightboxUpdate={this.lightboxUpdate}
          />
        )}
      </Fragment>
    );
  }
}

export default Album;
