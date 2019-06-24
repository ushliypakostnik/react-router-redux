import React, { Component } from "react";
import { connect } from 'react-redux';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import { THEME, COOKIES } from '../store/constants';
import { toggleTheme } from '../store/actions';

class ThemeSwitch extends Component {

  setTheme = (theme) => {
    if (theme === THEME.LIGHT) {
      document.body.classList.add("--light-theme");
    } else {
      document.body.classList.remove("--light-theme");
    }
  }

  themeChange = (theme) => {
    const { cookies } = this.props;
    cookies.set(COOKIES.THEME, theme, { path: '/' });
    this.setTheme(theme);
  }

  componentDidMount() {
    const { cookies } = this.props;
    const theme = cookies.get(COOKIES.THEME) ? cookies.get(COOKIES.THEME) : this.props.theme;
    if (theme !== this.props.theme) {
      this.props.toggleTheme(theme);
      this.setTheme(theme);
    }
  }

  render() {
    const { toggleTheme } = this.props;
    let { theme } = this.props;
    const text = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;

    return (
      /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
      <a href="#"
         className="app__theme-switch theme-switch"
         onClick={(e) => {
           e.preventDefault();
           theme === THEME.DARK ? theme = THEME.LIGHT : theme = THEME.DARK;
           toggleTheme(theme);
           this.themeChange(theme);
         }}
         aria-label="Theme Switch"
      >
        <span className="theme-switch__ico" aria-hidden="true"></span>
        <span className="theme-switch__label">{text} theme</span>
      </a>
    );
  }
}

ThemeSwitch.propTypes = {
  cookies: instanceOf(Cookies).isRequired
};

const mapStateToProps = (state) => ({
  theme: state.reducer.theme
});

const mapDispatchToProps = (dispatch) => ({
  toggleTheme: (theme) => dispatch(toggleTheme(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(ThemeSwitch));
