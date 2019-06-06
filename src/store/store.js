import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { browserHistory } from "react-router";
//import { createBrowserHistory } from "history";
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import { THEME } from './constants';

import { pageToActive } from './actions';
import reducer from './reducers';

const initialState = {
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

const middlewares = [];
middlewares.push(thunkMiddleware)

if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger();

  middlewares.push(loggerMiddleware);
}

function configureStore(state) {
  return createStore(
    combineReducers({
      reducer,
      routing: routerReducer
    }),
    initialState,
    applyMiddleware(...middlewares)
  );
}

const store = configureStore(initialState);

//const history = createBrowserHistory();
export const history = syncHistoryWithStore(browserHistory, store);
//history.listen(location => console.info('-> location:', location));

let lastUrl = "";
if (store.getState().routing.locationBeforeTransitions != null) {
  lastUrl = store.getState().routing.locationBeforeTransitions.pathname;
} else {
  lastUrl = "/";
}

//store.subscribe(() => {
//  console.log("Store: ", store.getState());
//  console.log("last Url: ", lastUrl);
//});

store.dispatch(pageToActive(lastUrl));

export default store;
