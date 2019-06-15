import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ScreenHelper from '../js/screen-helper';

import Gallery from 'react-photo-gallery';
import LightboxContainer from './lightbox';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryData: [],
      lightboxData: [],
      currentImage: 0,
      lightboxIsOpen: false
    };
    this.overlayKey = 0;
  }

  openLightbox = (event, obj) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  }

  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }

  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }

  lightboxUpdate = (data) => {
    if (!data) {
      this.closeLightbox();
    }
  }

  componentWillMount() {
    const galleryDataArr = Object.values(this.props.photos);
    const galleryResult = [];
    let src;
    if (ScreenHelper.isMin()) {
      if (ScreenHelper.getPixelRatio() > 1.5) {
        src = 'mobile-2x';
      } else {
        src = 'mobile';
      }
    } else {
      if (ScreenHelper.getPixelRatio() > 1.5) {
        src = 'desktop-2x';
      } else {
        src = 'desktop';
      }
    }
    galleryDataArr.forEach(data => {
      galleryResult.push({
        src: Object.values(data)[0].replace('{src}', src),
        width: Object.values(data)[1],
        height: Object.values(data)[2]
      });
    });
    this.setState({
      galleryData: galleryResult
    });

    const lightboxDataArr = Object.values(this.props.photos);
    const lightboxResult = [];
    if (!ScreenHelper.isXS()) {
      lightboxDataArr.forEach(data => {
        lightboxResult.push(Object.values(data)[0].replace('{src}/', ''));
      });
    } else {
      if (ScreenHelper.isMin()) {
        if (ScreenHelper.getPixelRatio() > 1.5) {
          src = 'mobile-2x';
        } else {
          src = 'mobile';
        }
      } else {
        if (ScreenHelper.getPixelRatio() > 1.5) {
          src = 'desktop-2x';
        } else {
          src = 'desktop';
        }
      }
      lightboxDataArr.forEach(data => {
        lightboxResult.push(Object.values(data)[0].replace('{src}', src));
      });
    }
    this.setState({
      lightboxData: lightboxResult
    });
  }

  render() {
    const { galleryData, lightboxData, currentImage, lightboxIsOpen } = this.state;
    ++this.overlayKey;
    console.log(lightboxData);

    return (
      <div className="app__gallery">
        <Gallery
          photos={galleryData}
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

// "empty connect" for fix lightbox resize bug
export default connect()(Album);
