import React, { Component } from "react";
/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { pageToActive } from '../store/actions';

import ScreenHelper from '../js/screen-helper';

import ThemeSwitch from './theme-switch';
import Menu, { MenuItem } from '../components/menu';
import { LjIcon } from '../components/icons';

import { Drawer } from 'antd';
import '../scss/widgets/_drawer.scss';
import { Icon } from 'antd';

import { faVk } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      pageIsActive: '',
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    pageIsActive: nextProps.pageIsActive,
    deviceType: nextProps.deviceType
  });

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

  render () {
    const { items, pageToActive, deviceType } = this.props;
    const { visible, pageIsActive } = this.state;

    return (
      <header className="app__header header" role="banner">
        <div className="container-fluid">
          <nav role="navigation">
            <Menu>
                {items.map((item, index) => {
                  return <MenuItem
                    key={index}
                    text={item.text}
                    path={item.path}
                    className={(pageIsActive === item.path) ? "app__menu--active" : ""}
                    onClick={() => {pageToActive(item.path)}}
                  />
                })}
            </Menu>
          </nav>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */}
          <a
            href="#"
            className="header__navbar"
            onClick={(e) => {
              e.preventDefault();
              if (visible) {
                this.setState({ visible: !visible });
              }
            }}
            aria-label="Open Menu"
          ><Icon type="menu" aria-hidden="true" /></a>
          <Drawer
            title={null}
            placement={'right'}
            closable={true}
            onClose={this.onClose}
            visible={visible}
            className={'app__panel'}
            width={deviceType === "small" ? "60%" : "40%"}
          >
            <nav role="navigation">
              <Menu>
                {items.map((item, index) => {
                  return <MenuItem
                    key={index}
                    text={item.text}
                    path={item.path}
                    className={(pageIsActive === item.path) ? "app__menu--active" : ""}
                    onClick={() => {
                      window.scrollTo( 0, 0 );
                      this.onClose();
                      pageToActive(item.path);
                    }}
                  />
                })}
                <ThemeSwitch />
              </Menu>
            </nav>
          </Drawer>
          <address className="header__right" role="contentinfo">
            <ThemeSwitch />
            <span
              className="header__logo header__logo--xs"
            >Ivan Samovarov</span>
            <a
              href="https://sambus.livejournal.com"
              className="header__social header__social--lj"
              /* eslint-disable-next-line react/jsx-no-target-blank */
              target="_blank"
              aria-label="Ivan Samovarov livejournal">
              <LjIcon aria-hidden="true" /></a>
            <a
              href="https://www.instagram.com/samovarov_ivan"
              className="header__social"
              /* eslint-disable-next-line react/jsx-no-target-blank */
              target="_blank"
              aria-label="Ivan Samovarov instagram">
              <FontAwesomeIcon icon={faInstagram} aria-hidden="true" /></a>
            <a
              href="https://www.facebook.com/samovaru"
              className="header__social"
              /* eslint-disable-next-line react/jsx-no-target-blank */
              target="_blank"
              aria-label="Ivan Samovarov facebook">
              <FontAwesomeIcon icon={faFacebookF} aria-hidden="true" /></a>
            <a
              href="https://vk.com/samovaru"
              className="header__social header__social--vk"
              /* eslint-disable-next-line react/jsx-no-target-blank */
              target="_blank"
              aria-label="Ivan Samovarov vkontakte">
              <FontAwesomeIcon icon={faVk} aria-hidden="true" /></a>
            <span className="header__logo">Ivan Samovarov</span>
          </address>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  items: PropTypes.array.isRequired,
  deviceType: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  pageIsActive: state.reducer.activePage,
  deviceType: state.reducer.resize.deviceType
});

const mapDispatchToProps = (dispatch) => ({
  pageToActive: (page) => dispatch(pageToActive(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
