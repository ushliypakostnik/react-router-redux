import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import '../scss/widgets/_lightbox.scss';

class LightboxContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: this.props.index,
      isOpen: this.props.isOpen
    };
  }

  render() {
    const { images, lightboxUpdate } = this.props;
    const { photoIndex, isOpen } = this.state;

    return (
      <Fragment>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() =>
              {
                this.setState({ isOpen: false });
                lightboxUpdate(this.state.isOpen);
              }}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
            animationDuration={100}
            enableZoom={false}
            reactModalStyle={{
              overlay: {
                zIndex: 2000
              }
            }}
          />
        )}
      </Fragment>
    );
  }
}

LightboxContainer.propTypes = {
  images: PropTypes.array.isRequired
};

export default LightboxContainer;
