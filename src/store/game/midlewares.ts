import {
  MiddlewareAPI,
  Dispatch,
  Middleware,
  AnyAction
} from 'redux';
import { NEXT_GAME_PHASE, SET_GAME_PHASE, DECREMENT_REMAINING_TIME, nextPhaseResolver } from './types';
import { ApplicationState } from 'store/';
import { decrementRemainingTime, setRemainingTime } from 'store/game/actions';
import { nextGamePhase } from 'store/game/actions';
import { interactionInit, nextTurnInit, gameInit, endGameReducer } from 'core/transitions/gameTransitions';
import cpuReducer from 'core/transitions/cpuActions';
import { startClock, stopClock } from 'utils/clock';

export interface ExtendedMiddleware<StateType> extends Middleware {
    <S extends StateType>(api: MiddlewareAPI<S>): (next: Dispatch<S>) => Dispatch<S>;
}

export const gamePhaseWatcher: ExtendedMiddleware<ApplicationState> = <S extends ApplicationState>({getState, dispatch}: MiddlewareAPI<S>) =>
  (next: Dispatch<S>) =>
    <A extends AnyAction>(action: A): A => {
      if (action.type === NEXT_GAME_PHASE || action.type === SET_GAME_PHASE) {
        const { game } = getState();
        const actualPhase = game.phase;
        const nextPhase = action.type === NEXT_GAME_PHASE ?
          nextPhaseResolver(game.phase) :
          action.payload.phase;
        if (actualPhase === 'INIT') {
          gameInit(game.playerOrder);
        }
        if (nextPhase === 'FINAL') {
          stopClock();
        } else {
          if (nextPhase === 'DISTRIBUTION') {
            nextTurnInit();
          }

          if (nextPhase === 'MOVE') {
            endGameReducer();
          }
          // Clock time
          stopClock();
          dispatch(setRemainingTime(60));
          startClock(() => dispatch(decrementRemainingTime()));

          interactionInit(nextPhase);
          cpuReducer(nextPhase);
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
