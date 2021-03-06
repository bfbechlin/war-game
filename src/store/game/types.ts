import { Action } from 'redux';
import { cyclicIncrement } from 'utils/array';

export type GamePhase = 'INIT' | 'DISTRIBUTION' | 'ATTACK' | 'MOVE' | 'FINAL';

export interface GameState {
  round: number;
  phase: GamePhase;
  remainingTime: number;
  turnOwner: string;
  activePlayers: string[];
  playerOrder: string[];
  cardsBonus: number;
}

export const SET_CARDS_BONUS = '@@game/SET_CARDS_BONUS';
export const SET_GAME_PHASE = '@@game/SET_GAME_PHASE';
export const NEXT_GAME_PHASE = '@@game/NEXT_GAME_PHASE';
export const SET_TURN_OWNER = '@@game/SET_TURN_OWNER';
export const DECREMENT_REMAINING_TIME = '@@game/DECREMENT_REMAINING_TIME';
export const SET_REMAINING_TIME = '@@game/SET_REMAINING_TIME';
export const SET_ACTIVE_PLAYERS = '@@game/SET_ACTIVE_PLAYERS';
export const SET_PLAYER_ORDER = '@@game/SET_PLAYER_ORDER';

export interface SetCardsBonusAction extends Action {
  type: '@@game/SET_CARDS_BONUS';
  payload: {
    quantity: number;
  };
}

export interface SetGamePhaseAction extends Action {
  type: '@@game/SET_GAME_PHASE';
  payload: {
    phase: GamePhase;
  };
}

export interface NextGamePhaseAction extends Action {
  type: '@@game/NEXT_GAME_PHASE';
  payload: {
  };
}

export interface SetTurnOwnerAction extends Action {
  type: '@@game/SET_TURN_OWNER';
  payload: {
    player: string;
  };
}

export interface DecrementRemainingTimeAction extends Action {
  type: '@@game/DECREMENT_REMAINING_TIME';
  payload: {
  };
}

export interface SetRemainingTimeAction extends Action {
  type: '@@game/SET_REMAINING_TIME';
  payload: {
    remainingTime: number;
  };
}

export interface SetActivePlayers extends Action {
  type: '@@game/SET_ACTIVE_PLAYERS';
  payload: {
    activePlayers: string[];
  };
}

export interface SetPlayerOrder extends Action {
  type: '@@game/SET_PLAYER_ORDER';
  payload: {
    playerOrder: string[];
  };
}

export type GameActions = SetCardsBonusAction | SetGamePhaseAction | NextGamePhaseAction | SetTurnOwnerAction 
  | DecrementRemainingTimeAction | SetRemainingTimeAction | SetActivePlayers | SetPlayerOrder;

export const gamePhaseOrder: GamePhase[] =  ['DISTRIBUTION', 'ATTACK', 'MOVE'];

export const nextPhaseResolver = (actualPhase: GamePhase): GamePhase => {
  switch (actualPhase) {
    case 'INIT':
      return 'DISTRIBUTION';
    case 'FINAL':
      return 'FINAL';
    default:
      return <GamePhase> cyclicIncrement(gamePhaseOrder, actualPhase);
  }
};