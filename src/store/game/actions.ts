import { ActionCreator } from 'redux';
import {
  SetCardsBonusAction,
  SET_CARDS_BONUS,
} from './types';

export const setQuantity: ActionCreator<SetCardsBonusAction> = (player: string, quantity: number) => ({
  type: SET_CARDS_BONUS,
  payload: {
    player,
    quantity
  }
});