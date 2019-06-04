import { THEME } from '../store/constants';

const Theme = ((theme) => {
  function setTheme(theme) {
    if (theme === THEME.LIGHT) {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }

  return {
    setTheme
  };
})();

export default Theme;
