export const initialState = {
  activePage: "/",
  theme: "dark",
  minHeight: 'auto',
  albums: [],
  images: []
};

export const theme = (state = initialState.theme, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case "TOGGLE_THEME":
      return Object.assign({}, state, {
        theme: action.theme
      });
    default:
      return state;
  }
}

export const page = (state = { }, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case "PAGE_TO_ACTIVE":
      return Object.assign({}, state, {
        activePage: action.activePage,
        minHeight: action.minHeight
      });
    default:
      return state;
  }
}
