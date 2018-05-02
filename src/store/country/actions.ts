import { ActionCreator } from 'redux';
import {
  SetTroopsAction,
  SET_TROOPS,
  IncrementTroopsAction,
  INCREMENT_TROOPS,
  DecrementTroopsAction,
  DECREMENT_TROOPS,
  ChangeOwnerAction,
  CHANGE_OWNER,
  SetHoverAction,
  SET_HOVER,
} from './types';

export const setTroops: ActionCreator<SetTroopsAction> = (countryName: string, quantity: number) => ({
  type: SET_TROOPS,
  payload: {
    countryName,
    quantity
  },
});

export const incrementTroops: ActionCreator<IncrementTroopsAction> = (countryName: string, quantity: number) => ({
  type: INCREMENT_TROOPS,
  payload: {
    countryName,
    quantity
  },
});

export const decrementTroops: ActionCreator<DecrementTroopsAction> = (countryName: string, quantity: number) => ({
  type: DECREMENT_TROOPS,
  payload: {
    countryName,
    quantity
  },
});

export const changeOwner: ActionCreator<ChangeOwnerAction> = (countryName: string, newOwner: string) => ({
  type: CHANGE_OWNER,
  payload: {
    countryName,
    newOwner
  },
});

export const setHover: ActionCreator<SetHoverAction> = (countryName: string, hovered: boolean) => ({
  type: SET_HOVER,
  payload: {
    countryName,
    hovered
  },
});