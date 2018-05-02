import { createStore, applyMiddleware, Store, combineReducers, Reducer, Dispatch } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';
import createHistory from 'history/createBrowserHistory';

import { CountryState } from './country/types';
import { MenuState } from './menu/types';
import { PlayerState } from './player/types';
import { GameState } from './game/types';

import countryReducer, { countryInitState } from './country/reducer';
import menuReducer, { initialState as MenuInitState } from './menu/reducer';
import playerReducer, { playerInitState } from './player/reducer';
import gameReducer, { gameInitState } from './game/reducer';

export interface ApplicationState {
  country: CountryState;
  menu: MenuState;
  player: PlayerState;
  game: GameState;
}

export const initialState = {
  country: countryInitState,
  menu: MenuInitState,
  player: playerInitState,
  game: gameInitState,
};

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  router: routerReducer,
  country: countryReducer,
  menu: menuReducer,
  player: playerReducer,
  game: gameReducer,
});

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<S> {
  // Correct types for the `dispatch` prop passed by `react-redux`.
  // Additional type information is given through generics.
  dispatch: Dispatch<S>;
}

export function configureStore(
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

export default configureStore(createHistory());