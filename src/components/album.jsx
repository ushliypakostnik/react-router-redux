import React, { Component } from "react";
import PropTypes from 'prop-types';

import Gallery from 'react-photo-gallery';
import LightboxContainer from '../containers/lightbox';

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
    const { photos } = this.props;
    const { currentImage, lightboxData, lightboxIsOpen } = this.state;
    ++this.overlayKey;

    return (
      <div className="app__gallery">
        <Gallery
          photos={photos}
          margin={0}
          targetRowHeight={350}
          onClick={this.openLightbox} />
        {lightboxIsOpen && (
          <LightboxContainer
            key={this.overlayKey}
            images={lightboxData}
            index={currentImage}
            isOpen={lightboxIsOpen}
            lightboxUpdate={this.lightboxUpdate}
          />
        )}
      </div>
    );
  }
}

Album.propTypes = {
  photos: PropTypes.array.isRequired
};

export default Album;
