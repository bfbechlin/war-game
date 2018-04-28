import { ActionCreator } from 'redux';
import {
  SetQuantityAction,
  SET_QUANTITY,
} from './types';

export const setQuantity: ActionCreator<SetQuantityAction> = (quantity: number) => ({
  type: SET_QUANTITY,
  payload: {
    quantity
  }
});