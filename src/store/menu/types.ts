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
export const SET_SELECTABLES = '@@menu/SET_SELECTABLES';
export const SET_SELECTEDS = '@@menu/SET_SELECTEDS';
export const SET_VIEW_MODE = '@@menu/SET_VIEW_MODE';

export interface SetQuantityAction extends Action {
  type: '@@menu/SET_QUANTITY';
  payload: {
    quantity: number;
  };
}

export interface SetSelectablesAction extends Action {
  type: '@@menu/SET_SELECTABLES';
  payload: {
    selectables: Countries[];
  };
}

export interface SetSelectedsAction extends Action {
  type: '@@menu/SET_SELECTEDS';
  payload: {
    selecteds: Countries[];
  };
}

export interface SetViewModeAction extends Action {
  type: '@@menu/SET_VIEW_MODE';
  payload: {
    viewMode: ViewMode;
  };
}

export type MenuActions = SetQuantityAction | SetSelectablesAction | SetSelectedsAction | SetViewModeAction;