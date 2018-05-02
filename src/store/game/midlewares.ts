import {
//  Middleware,
  MiddlewareAPI,
//  applyMiddleware,
//  StoreEnhancer,
//  createStore,
  Dispatch,
//  Reducer,
//  Action,
  Middleware,
  AnyAction
} from 'redux';
import { SET_GAME_PHASE } from './types';
import { ApplicationState } from 'store/';
import { setQuantity, setSelectables, setSelecteds } from 'store/menu/actions';
import { playerCountries } from 'core/transducers/map';

export interface ExtendedMiddleware<StateType> extends Middleware {
    <S extends StateType>(api: MiddlewareAPI<S>): (next: Dispatch<S>) => Dispatch<S>;
}

export const gamePhaseWatcher: ExtendedMiddleware<ApplicationState> = <S extends ApplicationState>({getState, dispatch}: MiddlewareAPI<S>) =>
  (next: Dispatch<S>) =>
    <A extends AnyAction>(action: A): A => {
      if (action.type === SET_GAME_PHASE) {
        const state = getState();
        const hasSelectables = 
          action.payload.phase !== 'INIT' && action.payload.phase !== 'FINAL' && (
            (state.game.mode === 'CPU' && state.game.activePlayer === state.game.turnOwner) ||
            (state.game.mode === 'PVP')
          );
        if (hasSelectables) {
          dispatch(setQuantity(1));
          dispatch(setSelecteds([]));
          dispatch(setSelectables(playerCountries(state.game.turnOwner, state.country)));
        } else {
          dispatch(setQuantity(1));
          dispatch(setSelecteds([]));
          dispatch(setSelectables([]));
        }
      }
      return next(action);
    };
