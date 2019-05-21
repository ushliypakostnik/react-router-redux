import { createStore, combineReducers } from 'redux';
import { browserHistory } from "react-router";
//import { createBrowserHistory } from "history";
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import { pageToActive } from './actions'
import reducer from './reducers'

const store = createStore(
  combineReducers({
    reducer,
    routing: routerReducer
  })
);

//const history = createBrowserHistory();
export const history = syncHistoryWithStore(browserHistory, store);
//history.listen(location => console.info('-> location:', location));

let lastUrl = "";
if (store.getState().routing.locationBeforeTransitions != null) {
  lastUrl = store.getState().routing.locationBeforeTransitions.pathname;
} else {
  lastUrl = "/";
}

/*store.subscribe(() => {
  console.log("Store: ", store.getState().reducer);
  console.log("last Url: ", lastUrl);
});*/

store.dispatch(pageToActive(lastUrl));

export default store;