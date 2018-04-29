import { Action } from 'redux';
import { Countries } from 'store/country/types';
import { Color } from 'utils/colors';

// index == ID
export interface PlayerState {
  [index: string]: PlayerInfo;
}

export interface PlayerInfo {
  name: string;
  cards: Card[]; 
  availableTroops: number;
  color: Color;
  avatar: string;
}

export interface Card {
  name: Countries;
  shape: 'SQUARE' | 'CIRCLE' | 'TRIANGLE';
}

export const SET_AVAILABLE_TROOPS = '@@player/SET_AVAILABLE_TROOPS';

export interface SetAvailableTroopsAction extends Action {
  type: '@@player/SET_AVAILABLE_TROOPS';
  payload: {
    player: string;
    quantity: number;
  };
}

export type PlayerActions = SetAvailableTroopsAction;