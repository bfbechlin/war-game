// index == ID
export interface PlayerState {
  [index: string]: PlayerInfo;
}

export interface PlayerInfo {
  name: string;
  cards: Card[]; 
  availableTroops: number;
  color: string;
  avatar: string;
}

export interface Card {
  name: string;
  shape: 'SQUARE' | 'CIRCLE' | 'TRIANGLE';
}