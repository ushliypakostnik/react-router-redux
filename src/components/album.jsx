import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SCREENS } from '../store/constants';
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

  lightboxUpdate = (state) => {
    if (!state) {
      this.closeLightbox();
    }
  }

  setGalleryData = (data) => {
    const galleryResult = [];
    let src;
    if (ScreenHelper.isMin()) {
      if (ScreenHelper.getPixelRatio() > 1.5) {
        src = SCREENS.MOBILE_2X;
      } else {
        src = SCREENS.MOBILE;
      }
    } else {
      if (ScreenHelper.getPixelRatio() > 1.5) {
        src = SCREENS.DESKTOP_2X;
      } else {
        src = SCREENS.DESKTOP;
      }
    }
    data.forEach(data => {
      galleryResult.push({
        src: Object.values(data)[0].replace('{src}', src),
        width: Object.values(data)[1],
        height: Object.values(data)[2]
      });
    });
    return galleryResult;
  }

  setLightboxData = (data) => {
    const lightboxResult = [];
    let src;
    if (!ScreenHelper.isXS()) {
      data.forEach(data => {
        lightboxResult.push(Object.values(data)[0].replace('{src}/', ''));
      });
    } else {
      if (ScreenHelper.isMin()) {
        if (ScreenHelper.getPixelRatio() > 1.5) {
          src = SCREENS.MOBILE_2X;
        } else {
          src = SCREENS.MOBILE;
        }
      } else {
        if (ScreenHelper.getPixelRatio() > 1.5) {
          src = SCREENS.DESKTOP_2X;
        } else {
          src = SCREENS.DESKTOP;
        }
      }
      data.forEach(data => {
        lightboxResult.push(Object.values(data)[0].replace('{src}', src));
      });
    }
    return lightboxResult;
  }

  componentWillMount() {
    this.setState({
      galleryData: this.setGalleryData(Object.values(this.props.photos))
    });
    this.setState({
      lightboxData: this.setLightboxData(Object.values(this.props.photos))
    });
  }

  render() {
    const { galleryData, lightboxData, currentImage, lightboxIsOpen } = this.state;
    ++this.overlayKey;

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
