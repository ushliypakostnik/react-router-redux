import React from "react";

import Menu, { MenuItem } from './menu';

import { faHome } from "@fortawesome/free-solid-svg-icons";
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
      <div className="header__right">Ivan Samovarov</div>
    </div>
  </div>
);

export default Header;
