const initialState = {
  page: null
};

const reducer = (state = initialState, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case "PAGEACTIVE":
      return Object.assign({}, state, {
        page: action.page
      });
      break;
    default:
      return state;
      break;
  }
}

export default reducer;