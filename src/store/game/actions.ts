import { ActionCreator } from 'redux';
import {
  GamePhase,
  SetCardsBonusAction,
  SET_CARDS_BONUS,
  SET_TURN_OWNER,
  SET_GAME_PHASE,
  NEXT_GAME_PHASE,
  DECREMENT_REMAINING_TIME,
  SET_REMAINING_TIME,
  SetGamePhaseAction,
  NextGamePhaseAction,
  SetTurnOwnerAction,
  SetRemainingTimeAction,
  DecrementRemainingTimeAction,
  SetPlayerOrder,
  SetActivePlayers,
  SET_ACTIVE_PLAYERS,
  SET_PLAYER_ORDER
} from './types';

export const setCardBonus: ActionCreator<SetCardsBonusAction> = (quantity: number) => ({
  type: SET_CARDS_BONUS,
  payload: {
    quantity
  }
});

export const nextGamePhase: ActionCreator<NextGamePhaseAction> = () => ({
  type: NEXT_GAME_PHASE,
  payload: {
  }
});

export const setGamePhase: ActionCreator<SetGamePhaseAction> = (phase: GamePhase) => ({
  type: SET_GAME_PHASE,
  payload: {
    phase
  }
});

export const setTurnOwner: ActionCreator<SetTurnOwnerAction> = (player: string) => ({
  type: SET_TURN_OWNER,
  payload: {
    player
  }
});

export const decrementRemainingTime: ActionCreator<DecrementRemainingTimeAction> = () => ({
  type: DECREMENT_REMAINING_TIME,
  payload: {
  }
});

export const setRemainingTime: ActionCreator<SetRemainingTimeAction> = (remainingTime) => ({
  type: SET_REMAINING_TIME,
  payload: {
    remainingTime
  }
});

export const setActivePlayers: ActionCreator<SetActivePlayers> = (activePlayers) => ({
  type: SET_ACTIVE_PLAYERS,
  payload: {
    activePlayers
  }
});

export const setPlayerOrder: ActionCreator<SetPlayerOrder> = (playerOrder) => ({
  type: SET_PLAYER_ORDER,
  payload: {
    playerOrder
  }
});