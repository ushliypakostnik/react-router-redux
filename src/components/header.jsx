import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';

import { pageToActive } from '../store/actions.js';

import Menu, { MenuItem } from './menu';

import { Drawer } from 'antd';
import '../scss/widgets/_drawer.scss';
import { Icon } from 'antd';

import { faVk } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      pageIsActive: ""
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    pageIsActive: nextProps.pageIsActive
  });

  render () {
    return (
      <div className="app__header">
        <div className="container-fluid">
          <Menu>
            {this.props.items.map((item, index) => {
              return <MenuItem
                key={index}
                text={item.text}
                path={item.path}
                className={(this.state.pageIsActive == item.path) ? "app__menu--active" : ""}
                onClick={() => {this.props.pageToActive(item.path)}}
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
            placement={'right'}
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
            className={'app__panel'}
            width={"60%"}
          >
            <Menu>
              {this.props.items.map((item, index) => {
                return <MenuItem
                  key={index}
                  text={item.text}
                  path={item.path}
                  className={(this.state.pageIsActive == item.path) ? "app__menu--active" : ""}
                  onClick={() => {this.props.pageToActive(item.path)}}
                />
              })}
            </Menu>
          </Drawer>
          <div className="header__right">
            <span
              className="header__logo header__logo--xs"
            >Ivan Samovarov</span>
            <a
              href="https://vk.com/samovaru"
              className="header__social"
              target="_blank"><FontAwesomeIcon icon={faVk} /></a>
            <a
              href="https://www.facebook.com/samovaru"
              className="header__social"
              target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a>
            <Link
              to="/"
              className="header__logo"
              onClick={() => {this.props.pageToActive(this.props.items[0].path)}}
            >Ivan Samovarov</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pageIsActive: state.reducer.activePage
});

const mapDispatchToProps = (dispatch) => ({
  pageToActive: (page) => dispatch(pageToActive(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
