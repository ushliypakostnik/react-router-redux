import React, { Component } from "react";
import { connect } from 'react-redux';

/* eslint-disable no-unused-vars */
import { render } from 'react-dom';
import ReactResizeDetector from 'react-resize-detector';

import { setMinHeight, resize } from '../store/actions.js';

import ScreenHelper from '../js/screen-helper';

class Resize extends Component {
  constructor(props) {
    super(props);
    //this.scrollbarWidth = null;
  }

  // more reliably
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
    this.props.resize(this.getMinHeight(), this.getDeviceType());
  }
}

const mapDispatchToProps = (dispatch) => ({
  resize: (minHeight, deviceType) => dispatch(resize(minHeight, deviceType))
});

export default connect(null, mapDispatchToProps)(Resize);
