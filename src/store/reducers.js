const initialState = {
  activePage: "/"
};

const reducer = (state = initialState, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case "PAGETOACTIVE":
      return Object.assign({}, state, {
        activePage: action.activePage
      });
    default:
      return state;
  }
}

export default reducer;