export const FETCH_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8082';

export const THEME = {
  DARK: 'dark',
  LIGHT: 'light'
};

export const COOKIES = {
  THEME: 'theme'
};

export const INITIAL_STATE = {
  reducer: {
    activePage: '/',
    theme: THEME.DARK,
    isFetching: false,
    albums: [],
    data: [],
    resize: {
      minHeight: 'auto',
      deviceType: 'large'
    },
    error: null
  },
  routing: {}
};

export const SCREENS = {
  MOBILE: 'mobile',
  MOBILE_2X: 'mobile-2x',
  DESKTOP: 'desktop',
  DESKTOP_2X: 'desktop-2x'
};
