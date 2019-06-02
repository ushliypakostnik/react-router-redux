import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import '../scss/widgets/_lightbox.scss';

class LightboxContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: this.props.index,
      isOpen: this.props.isOpen,
      theme: ''
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    theme: nextProps.theme
  });

  render() {
    const { images, lightboxUpdate } = this.props;
    const { photoIndex, isOpen, theme } = this.state;

    return (
      <Fragment>
        {isOpen && (
          <Fragment>
            <Lightbox
              mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              onCloseRequest={() =>
                {
                  this.setState({ isOpen: false });
                  lightboxUpdate(isOpen);
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
              animationDuration={200}
              enableZoom={false}
              reactModalStyle={{
                overlay: {
                  zIndex: 2000
                }
              }}
              wrapperClassName={theme === 'light' ? "light-theme" : ""}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

LightboxContainer.propTypes = {
  images: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  theme: state.reducer.theme
});

export default connect(mapStateToProps)(LightboxContainer);
