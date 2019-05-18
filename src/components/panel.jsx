import React from "react";

import Menu, { MenuItem } from './menu';

const Panel = props => (
  <div className="app__panel">
    <Menu>
      {props.items.map((item, index) => {
        return <MenuItem
          key={index}
          text={item.link}
          path={item.path}
        />
      })}
    </Menu>
  </div>
);

export const NoPanel = props => (
  <div className="app__no-panel" onClick={props.onClick}></div>
);

export default Panel;
