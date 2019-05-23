import React from "react";
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

export default Menu;
