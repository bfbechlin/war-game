import { createStore, applyMiddleware, Store } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';

import { ApplicationState, reducers, initialState } from './store';

export default function configureStore(
  history: History,
): Store<ApplicationState> {
  const composeEnhancers = composeWithDevTools({});

  return createStore<ApplicationState>(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(
      routerMiddleware(history),
    )),
  );
}