import React, { Component } from "react";
import { connect } from 'react-redux';

/* eslint-disable no-unused-vars */
import { render } from 'react-dom';
import ReactResizeDetector from 'react-resize-detector';

import { setMinHeight, setDeviceType } from '../store/actions.js';

import ScreenHelper from '../js/screen-helper';

class Resize extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minHeight: 'auto',
      deviceType: 'large'
    };
    //this.scrollbarWidth = null;
  }

  //componentDidMount() {
  //  this.scrollbarWidth = ScreenHelper.getScrollbarWidth();
  //}

  render() {
    return (
      <div className="app__resize">
        <ReactResizeDetector handleHeight onResize={this.onResize} />
      </div>
    );
  }

  getMinHeight = () => {
    if (ScreenHelper.getScrollbarWidth() > 0) {
      return window.innerHeight - 50 + 'px';
    } else {
      return 'auto';
    }
  }

  getDeviceType = () => {
    if (ScreenHelper.isMin() && ScreenHelper.getOrientation() === 'portrait') {
      return 'small'
    }  else {
      return 'large';
    }
  }

  onResize = () => {
    const minHeight = this.getMinHeight();
    const deviceType = this.getDeviceType();
    this.setState({
      minHeight: minHeight,
      deviceType: deviceType
    });
    this.props.setMinHeight(minHeight);
    this.props.setDeviceType(deviceType);
  }
}

const mapDispatchToProps = (dispatch) => ({
  setMinHeight: (minHeight) => dispatch(setMinHeight(minHeight)),
  setDeviceType: (deviceType) => dispatch(setDeviceType(deviceType))
});

export default connect(null, mapDispatchToProps)(Resize);
