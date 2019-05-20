import { createStore, combineReducers } from 'redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

store.subscribe(() => {
  console.log("Store: ", store.getState().reducer);
});

//const history = createBrowserHistory();
export const history = syncHistoryWithStore(browserHistory, store);
//history.listen(location => console.info('-> location:', location));

export default store;