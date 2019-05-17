import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Menu = props => (
  <ul className="app__menu">
    {props.children}
  </ul>
);

export const MenuItem = ({ text, path, className }) => (
  <li>
    <Link
      to={path}
      className={className}
    >{text}</Link>
  </li>
);

export default Menu;
