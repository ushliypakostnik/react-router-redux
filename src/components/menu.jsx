import React from "react"
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom"

import { faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Menu = props => (
  <ul className="app__menu">
    {props.children}
  </ul>
)

export const MenuItem = ({ onClick, text, path, className }) => (
  <li>
    <NavLink
      to={path}
      onClick={onClick}
      className={className}
      activeClassName="app__menu--active"
    ><FontAwesomeIcon icon={faHome} /> {text}</NavLink>
  </li>
)

export default Menu
