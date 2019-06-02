import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { browserHistory } from "react-router";
//import { createBrowserHistory } from "history";
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import { pageToActive } from './actions'
import { page, theme } from './reducers'

const loggerMiddleware = createLogger();

function configureStore() {
  return createStore(
    combineReducers({
      page,
      theme,
      routing: routerReducer
    }),
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );
}

const store = configureStore();

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
//  console.log("Store, pages: ", store.getState());
//  console.log("last Url: ", lastUrl);
//});

store.dispatch(pageToActive(lastUrl));

export default store;
