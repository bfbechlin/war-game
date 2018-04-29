import { Action } from 'redux';

export type GamePhase = 'INIT' | 'DISTRIBUTION' | 'ATTACK' | 'MOVE' | 'FINAL';
export type GameMode =  'CPU' | 'PVP';

export interface GameState {
  round: number;
  mode: GameMode;
  phase: GamePhase;
  remainingTime: number;
  turnOwner: string;
  cardsBonus: number;
}

export const SET_CARDS_BONUS = '@@game/SET_CARDS_BONUS';

export interface SetCardsBonusAction extends Action {
  type: '@@game/SET_CARDS_BONUS';
  payload: {
    quantity: number;
  };
}

export type GameActions = SetCardsBonusAction;