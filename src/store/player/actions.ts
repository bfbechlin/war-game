import { ActionCreator } from 'redux';
import {
  SetAvailableTroopsAction,
  SET_AVAILABLE_TROOPS,
} from './types';

export const setQuantity: ActionCreator<SetAvailableTroopsAction> = (player: string, quantity: number) => ({
  type: SET_AVAILABLE_TROOPS,
  payload: {
    player,
    quantity
  }
});