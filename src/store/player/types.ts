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

export const DummyPlayer = {
  name: 'INIT_GAME',
  cards: [],
  availableTroops: 0,
  color: GREY,
  avatar: 'IG'
};