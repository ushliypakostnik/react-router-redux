import React, { Component } from "react";
import { connect } from 'react-redux';

import { toogleTheme } from '../store/actions.js';

class ThemeSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: ''
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    theme: nextProps.theme
  });

  render() {
    const { toogleTheme } = this.props;
    const { theme } = this.state;
    const text = theme === 'dark' ? 'light' :'dark';

    return (
      /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
      <a href="#"
         className="app__theme-switch theme-switch"
         onClick={(e) => {
           e.preventDefault();
           theme === 'dark' ?
             toogleTheme('light') :
             toogleTheme('dark');
         }}
      >
        <span className="theme-switch__ico"></span>
        <span className="theme-switch__label">to {text} theme</span>
      </a>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.reducer.theme
});

const mapDispatchToProps = (dispatch) => ({
  toogleTheme: (theme) => dispatch(toogleTheme(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch);
