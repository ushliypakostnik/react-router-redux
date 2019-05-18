import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Menu, { MenuItem } from './menu';
import Panel, { NoPanel } from './panel';

import { faVk } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  render () {
    return (
      <div className="app__header">
        <div className="container-fluid">
          <Menu>
            {this.props.items.map((item, index) => {
              return <MenuItem
                key={index}
                text={item.link}
                path={item.path}
              />
            })}
          </Menu>
          <Panel {...this.props} items={this.props.items} />
          <a
            href="#"
            className="app__panel-close"
            onClick={(e) => {
              e.preventDefault();
              this.setState({ isOpen: false });
              this.props.togglePanel(false);
            }}
          ><FontAwesomeIcon icon={faTimes} /></a>
          <NoPanel onClick={(e) => {
              e.preventDefault();
              this.setState({ isOpen: false });
              this.props.togglePanel(false);
            }}
          />
          <a
            href="#"
            className="header__navbar"
            onClick={(e) => {
              e.preventDefault();
              if (this.state.isOpen) {
                this.setState({ isOpen: false });
              } else {
                this.setState({ isOpen: true });
              }
              this.props.togglePanel(!this.state.isOpen);
            }}
          ><FontAwesomeIcon icon={faBars} /></a>
          <div className="header__right">
            <Link to="/" className="header__logo header__logo--xs">Ivan Samovarov</Link>
            <a href="https://vk.com/samovaru" className="header__social" target="_blank"><FontAwesomeIcon icon={faVk} /></a>
            <a href="https://www.facebook.com/samovaru" className="header__social" target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a>
            <Link to="/" className="header__logo">Ivan Samovarov</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
