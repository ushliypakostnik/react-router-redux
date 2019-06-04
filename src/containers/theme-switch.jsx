import React, { Component } from "react";
import { connect } from 'react-redux';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import { THEME, COOKIES } from '../store/constants';
import { toogleTheme } from '../store/actions.js';
import Theme from '../js/theme';

class ThemeSwitch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: ''
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    theme: nextProps.theme,
  });

  themeChange = (theme) => {
    const { cookies } = this.props;
    cookies.set(COOKIES.THEME, theme, { path: '/' });
    Theme.setTheme(theme);
  }

  componentDidMount() {
    const { cookies } = this.props;
    const theme = cookies.get(COOKIES.THEME) ? cookies.get(COOKIES.THEME) : this.props.theme;
    if (theme !== this.props.theme) {
      this.props.toogleTheme(theme);
      Theme.setTheme(theme);
    }
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

const mapStateToProps = (state) => ({
  theme: state.reducer.theme
});

const mapDispatchToProps = (dispatch) => ({
  toogleTheme: (theme) => dispatch(toogleTheme(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(ThemeSwitch));
