import React, { Component } from "react";
/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { pageToActive } from '../store/actions.js';

import ScreenHelper from '../js/screen-helper';

import Menu, { MenuItem } from '../components/menu';
import ThemeSwitch from '../components/theme-switch';

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
      pageIsActive: '',
      theme: ''
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
    pageIsActive: nextProps.pageIsActive,
    theme: nextProps.theme
  });

  render () {
    const { items, pageToActive } = this.props;
    const { visible, pageIsActive, theme } = this.state;

    return (
      <div className={theme === 'light' ? "app__header header header--light-theme" : "app__header header"}>
        <div className="container-fluid">
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
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            href="#"
            className="header__navbar"
            onClick={(e) => {
              e.preventDefault();
              if (visible) {
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
            visible={visible}
            className={'app__panel'}
            width={"60%"}
          >
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
              <ThemeSwitch theme={theme} />
            </Menu>
          </Drawer>
          <div className="header__right">
            <ThemeSwitch theme={theme} />
            <span
              className="header__logo header__logo--xs"
            >Ivan Samovarov</span>
            <a
              href="https://vk.com/samovaru"
              className="header__social"
              /* eslint-disable-next-line react/jsx-no-target-blank */
              target="_blank"><FontAwesomeIcon icon={faVk} /></a>
            <a
              href="https://www.facebook.com/samovaru"
              className="header__social"
              /* eslint-disable-next-line react/jsx-no-target-blank */
              target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a>
            <Link
              to="/"
              className="header__logo"
              onClick={() => {pageToActive(items[0].path)}}
            >Ivan Samovarov</Link>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  items: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  pageIsActive: state.reducer.activePage,
  theme: state.reducer.theme
});

const mapDispatchToProps = (dispatch) => ({
  pageToActive: (page) => dispatch(pageToActive(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
