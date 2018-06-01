import { ActionCreator } from 'redux';
import {
  IncrementAvailableTroopsAction,
  INCREMENT_AVAILABLE_TROOPS,
  DecrementAvailableTroopsAction,
  DECREMENT_AVAILABLE_TROOPS,
  NewPlayerAction,
  NEW_PLAYER,
  PlayerInfo
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

export const newPlayer: ActionCreator<NewPlayerAction> = (player: PlayerInfo) => ({
  type: NEW_PLAYER,
  payload: {
    player
  }
});