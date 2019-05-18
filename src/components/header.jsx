import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Menu, { MenuItem } from './menu';

import { Drawer } from 'antd';
import '../scss/widgets/_drawer.scss';
import { Icon } from 'antd';

import { faVk } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      placement: 'right'
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };

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
          <a
            href="#"
            className="header__navbar"
            onClick={(e) => {
              e.preventDefault();
              if (this.state.visible) {
                this.setState({ visible: false });
              } else {
                this.setState({ visible: true });
              }
            }}
          ><Icon type="menu" /></a>
          <Drawer
            title={null}
            placement={this.state.placement}
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
            bodyStyle={{overflow: 'auto'}}
            className={'app__panel'}
            width={"60%"}
          >
            <Menu>
              {this.props.items.map((item, index) => {
                return <MenuItem
                  key={index}
                  text={item.link}
                  path={item.path}
                />
              })}
            </Menu>
          </Drawer>
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
