import { Action } from 'redux';
import { Countries } from 'store/country/types';

export interface MenuState {
  quantity: number;
  to: Countries | null;
  from: Countries | null;
  selected: 'TO' | 'FROM';
}

export const SET_QUANTITY = '@@menu/SET_QUANTITY';

export interface SetQuantityAction extends Action {
  type: '@@menu/SET_QUANTITY';
  payload: {
    quantity: number;
  };
}

export type MenuActions = SetQuantityAction;