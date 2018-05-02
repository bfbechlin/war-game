import {
//  Middleware,
  MiddlewareAPI,
//  applyMiddleware,
//  StoreEnhancer,
//  createStore,
  Dispatch,
//  Reducer,
  Action,
  Middleware,
//  AnyAction
} from 'redux';
import { SET_GAME_PHASE } from './types';
import { ApplicationState } from 'store/';

export const gamePhaseWatcher = ()  => {
  const middleware: Middleware = <ApplicationState>({ dispatch, getState }: MiddlewareAPI<ApplicationState>) => (
    next: Dispatch
  ) => (action: Action) => {
    if (action.type === SET_GAME_PHASE) {
      console.log(action);
    }
    return next(action);
  };
  return middleware;
};
