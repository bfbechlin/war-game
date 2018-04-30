import { Action } from 'redux';
import { Countries } from 'store/country/types';

export type ViewMode = 'CONTINENT' | 'PLAYER';

export interface MenuState {
  quantity: number;
  // Not normalized form, but it improves a lot computation needs on state mappers
  selectables: Countries[];
  selecteds: Countries[];
  viewMode: ViewMode;
}

export const SET_QUANTITY = '@@menu/SET_QUANTITY';

export interface SetQuantityAction extends Action {
  type: '@@menu/SET_QUANTITY';
  payload: {
    quantity: number;
  };
}

export type MenuActions = SetQuantityAction;