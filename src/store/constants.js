export const FETCH_URL = process.env.REACT_APP_API_URL;

export const THEME = {
  DARK: "dark",
  LIGHT: "light"
};

export const COOKIES = {
  THEME: "theme"
};

export const INITIAL_STATE = {
  reducer: {
    activePage: "/",
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
