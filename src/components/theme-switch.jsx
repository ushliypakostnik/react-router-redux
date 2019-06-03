import React, { Component } from "react";
import { connect } from 'react-redux';

import { THEME, toogleTheme } from '../store/actions.js';

class ThemeSwitch extends Component {

  render() {
    const { toogleTheme, theme } = this.props;
    const text = theme === THEME.DARK ? THEME.LIGHT :THEME.DARK;

    return (
      /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
      <a href="#"
         className="app__theme-switch theme-switch"
         onClick={(e) => {
           e.preventDefault();
           theme === THEME.DARK ?
             toogleTheme(THEME.LIGHT) :
             toogleTheme(THEME.DARK);
         }}
      >
        <span className="theme-switch__ico"></span>
        <span className="theme-switch__label">{text} theme</span>
      </a>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toogleTheme: (theme) => dispatch(toogleTheme(theme))
});

export default connect(null, mapDispatchToProps)(ThemeSwitch);
