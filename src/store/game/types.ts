import { Action } from 'redux';

export type GamePhase = 'INIT' | 'DISTRIBUTION' | 'ATTACK' | 'MOVE' | 'FINAL';
export type GameMode =  'CPU' | 'PVP';

export interface GameState {
  round: number;
  mode: GameMode;
  phase: GamePhase;
  remainingTime: number;
  turnOwner: string;
  activePlayer: string | null;
  cardsBonus: number;
}

export const SET_CARDS_BONUS = '@@game/SET_CARDS_BONUS';
export const SET_GAME_PHASE = '@@game/SET_GAME_PHASE';
export const SET_TURN_OWNER = '@@game/SET_TURN_OWNER';

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

export interface SetTurnOwnerAction extends Action {
  type: '@@game/SET_TURN_OWNER';
  payload: {
    player: string;
  };
}

export type GameActions = SetCardsBonusAction | SetGamePhaseAction | SetTurnOwnerAction;