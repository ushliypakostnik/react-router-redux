import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Menu, { MenuItem } from './menu';

import { faVk } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = props => (
  <div className="app__header">
    <div className="container-fluid">
      <Menu>
        {props.items.map((item, index) => {
          return <MenuItem
            key={index}
            text={item.link}
            path={item.path}
          />
        })}
      </Menu>
      <a href="#" className="header__navbar"><FontAwesomeIcon icon={faBars} /></a>
      <div className="header__right">
        <a href="https://vk.com/samovaru" className="header__social" target="_blank"><FontAwesomeIcon icon={faVk} /></a>
        <a href="https://www.facebook.com/samovaru" className="header__social" target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a>
        <Link to="/" className="header__logo">Ivan Samovarov</Link>
      </div>
    </div>
  </div>
);

export default Header;
