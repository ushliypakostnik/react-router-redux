import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import classNames from "classnames";

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Menu = props => (
  <ul className="page__menu">
    {props.children}
  </ul>
);

export const MenuItem = ({ onClick, text, className, path }) => (
  <li>
    <Link 
      to={path} 
      className={className}
      onClick={onClick}
    ><FontAwesomeIcon icon={faHome} /> {text}</Link>
  </li>
);

export default Menu;
