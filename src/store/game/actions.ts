import { ActionCreator } from 'redux';
import {
  GamePhase,
  SetCardsBonusAction,
  SET_CARDS_BONUS,
  SET_TURN_OWNER,
  SET_GAME_PHASE,
  SetGamePhaseAction,
  SetTurnOwnerAction,
} from './types';

export const setCardBonus: ActionCreator<SetCardsBonusAction> = (quantity: number) => ({
  type: SET_CARDS_BONUS,
  payload: {
    quantity
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