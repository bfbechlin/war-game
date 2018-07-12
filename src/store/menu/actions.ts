import { ActionCreator } from 'redux';
import { Countries } from 'store/country/types';
import {
  ViewMode,
  SetQuantityAction,
  SET_QUANTITY,
  SetSelectablesAction,
  SET_SELECTABLES,
  SetSelectedsAction,
  SET_SELECTEDS,
  SetViewModeAction,
  SET_VIEW_MODE,
} from './types';

export const setQuantity: ActionCreator<SetQuantityAction> = (quantity: number) => ({
  type: SET_QUANTITY,
  payload: {
    quantity
  }
});

export const setSelectables: ActionCreator<SetSelectablesAction> = (selectables: Countries[]) => ({
  type: SET_SELECTABLES,
  payload: {
    selectables
  }
});

export const setSelecteds: ActionCreator<SetSelectedsAction> = (selecteds: Countries[]) => ({
  type: SET_SELECTEDS,
  payload: {
    selecteds
  }
});

export const setViewMode: ActionCreator<SetViewModeAction> = (viewMode: ViewMode) => ({
  type: SET_VIEW_MODE,
  payload: {
    viewMode
  }
});