import React, { Component } from "react";
import { connect } from 'react-redux';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import { THEME, COOKIES } from '../store/constants';
import { toogleTheme } from '../store/actions.js';

class ThemeSwitch extends Component {

  themeChange = (theme) => {
    const { cookies } = this.props;
    cookies.set(COOKIES.THEME, theme, { path: '/' });
  }

  render() {
    const { toogleTheme } = this.props;
    let { theme } = this.props;
    const text = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;

    return (
      /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
      <a href="#"
         className="app__theme-switch theme-switch"
         onClick={(e) => {
           e.preventDefault();
           theme === THEME.DARK ? theme = THEME.LIGHT : theme = THEME.DARK;
           toogleTheme(theme);
           this.themeChange(theme);
         }}
      >
        <span className="theme-switch__ico"></span>
        <span className="theme-switch__label">{text} theme</span>
      </a>
    );
  }
}

ThemeSwitch.propTypes = {
  cookies: instanceOf(Cookies).isRequired
};

const mapDispatchToProps = (dispatch) => ({
  toogleTheme: (theme) => dispatch(toogleTheme(theme))
});

export default connect(null, mapDispatchToProps)(withCookies(ThemeSwitch));
