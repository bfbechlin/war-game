import { Action } from 'redux';
import { Countries } from 'store/country/types';
import { Color, GREY } from 'utils/colors';

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

export const INCREMENT_AVAILABLE_TROOPS = '@@player/INCREMENT_AVAILABLE_TROOPS';
export const DECREMENT_AVAILABLE_TROOPS = '@@player/DECREMENT_AVAILABLE_TROOPS';
export const NEW_PLAYER = '@@player/NEW_PLAYER';

export interface IncrementAvailableTroopsAction extends Action {
  type: '@@player/INCREMENT_AVAILABLE_TROOPS';
  payload: {
    player: string;
    quantity: number;
  };
}

export interface DecrementAvailableTroopsAction extends Action {
  type: '@@player/DECREMENT_AVAILABLE_TROOPS';
  payload: {
    player: string;
    quantity: number;
  };
}

export interface NewPlayerAction extends Action {
  type: '@@player/NEW_PLAYER';
  payload: {
    player: PlayerInfo;
  };
}

export type PlayerActions = IncrementAvailableTroopsAction | DecrementAvailableTroopsAction | NewPlayerAction;

export const DummyPlayer = {
  name: 'INIT_GAME',
  cards: [],
  availableTroops: 0,
  color: GREY,
  avatar: 'IG'
};