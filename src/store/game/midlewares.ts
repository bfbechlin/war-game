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
import { NEXT_GAME_PHASE, SET_GAME_PHASE, DECREMENT_REMAINING_TIME, nextPhaseResolver } from './types';
import { ApplicationState } from 'store/';
import { decrementRemainingTime, setRemainingTime } from 'store/game/actions';
import { nextGamePhase } from 'store/game/actions';
import { interactionInit, nextTurnInit, gameInit } from 'core/transitions/gameTransitions';
import { startClock, stopClock } from 'utils/clock';

export interface ExtendedMiddleware<StateType> extends Middleware {
    <S extends StateType>(api: MiddlewareAPI<S>): (next: Dispatch<S>) => Dispatch<S>;
}

export const gamePhaseWatcher: ExtendedMiddleware<ApplicationState> = <S extends ApplicationState>({getState, dispatch}: MiddlewareAPI<S>) =>
  (next: Dispatch<S>) =>
    <A extends AnyAction>(action: A): A => {
      if (action.type === NEXT_GAME_PHASE || action.type === SET_GAME_PHASE) {
        const { game, player } = getState();
        const actualPhase = game.phase;
        const nextPhase = action.type === NEXT_GAME_PHASE ?
          nextPhaseResolver(game.phase) :
          action.payload.phase;
        if (actualPhase === 'INIT') {
          gameInit(player);
        }
        if (nextPhase === 'FINAL') {
          stopClock();
        } else {
          if (nextPhase === 'DISTRIBUTION') {
            nextTurnInit();
          }
          // Clock time
          stopClock();
          dispatch(setRemainingTime(30));
          startClock(() => dispatch(decrementRemainingTime()));

          interactionInit(nextPhase);

          if (game.mode === 'CPU') {
            setTimeout(
              () => {
                // HERE CPU
                // cpuAction(nextPhase); --> passing actual game phase
                setTimeout(
                  () => {
                    dispatch(nextGamePhase());
                  },
                  2000
                );
              },
              2000);
            console.log('CPU');
          }

        }
      }
      return next(action);
    };

export const remainingTimeWatcher: ExtendedMiddleware<ApplicationState> = <S extends ApplicationState>({getState, dispatch}: MiddlewareAPI<S>) =>
  (next: Dispatch<S>) =>
    <A extends AnyAction>(action: A): A => {
      if (action.type === DECREMENT_REMAINING_TIME) {
        const { remainingTime } = getState().game;
        if (remainingTime === 1) {
          dispatch(nextGamePhase());
        }
      }
      return next(action);
    };
