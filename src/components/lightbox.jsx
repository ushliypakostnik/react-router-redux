import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class LightboxContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: this.props.index,
      isOpen: this.props.isOpen,
    };
  }

  render() {
    const { photoIndex, isOpen } = this.state;
    console.log("Внутри: ", isOpen);

    return (
      <div>
        {isOpen && (
          <Lightbox
            mainSrc={this.props.images[photoIndex]}
            nextSrc={this.props.images[(photoIndex + 1) % this.props.images.length]}
            prevSrc={this.props.images[(photoIndex + this.props.images.length - 1) % this.props.images.length]}
            onCloseRequest={() => 
              {
                this.setState({ isOpen: false });
                this.props.lightboxUpdate(this.state.isOpen);
              }}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + this.props.images.length - 1) % this.props.images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % this.props.images.length,
              })
            }
            animationDuration={200}
            enableZoom={false}
          />
        )}
      </div>
    );
  }
}

export default LightboxContainer;