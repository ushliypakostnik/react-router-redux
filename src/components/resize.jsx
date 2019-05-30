import React from "react";
import PropTypes from 'prop-types';

const Resize = props => (
  <div className="app__resize">
    {props.children}
  </div>
);

Resize.propTypes = {
  children: PropTypes.node.isRequired
};

export default Resize;
