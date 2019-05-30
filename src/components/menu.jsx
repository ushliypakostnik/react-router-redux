import React from "react";
import PropTypes from 'prop-types';
/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Menu = props => (
  <ul className="app__menu">
    {props.children}
  </ul>
);

export const MenuItem = ({ text, path, className, onClick }) => (
  <li>
    <Link
      to={path}
      className={className}
      onClick={onClick}
    >{text}</Link>
  </li>
);

Menu.propTypes = {
  children: PropTypes.array.isRequired
};

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Menu;
