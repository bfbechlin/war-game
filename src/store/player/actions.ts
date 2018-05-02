import { ActionCreator } from 'redux';
import {
  IncrementAvailableTroopsAction,
  INCREMENT_AVAILABLE_TROOPS,
  DecrementAvailableTroopsAction,
  DECREMENT_AVAILABLE_TROOPS,
} from './types';

export const incrementAvailableTroops: ActionCreator<IncrementAvailableTroopsAction> = (player: string, quantity: number) => ({
  type: INCREMENT_AVAILABLE_TROOPS,
  payload: {
    player,
    quantity
  }
});

export const decrementAvailableTroops: ActionCreator<DecrementAvailableTroopsAction> = (player: string, quantity: number) => ({
  type: DECREMENT_AVAILABLE_TROOPS,
  payload: {
    player,
    quantity
  }
});