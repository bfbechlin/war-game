import { Reducer } from 'redux';
import { PlayerState, SET_AVAILABLE_TROOPS, PlayerActions } from './types'; 
import { GREEN, RED } from 'utils/colors';

export const playerInitState: PlayerState = {
  'PLAYER_1': {
    name: 'PLAYER_1',
    cards: [],
    availableTroops: 8,
    color: GREEN,
    avatar: 'P1'
  },
  'PLAYER_2': {
    name: 'PLAYER_2',
    cards: [],
    availableTroops: 13,
    color: RED,
    avatar: 'P2'
  }
};  

const reducer: Reducer<PlayerState> = (state: PlayerState = playerInitState, action) => { 
  let quantity, player;
  switch ((action as PlayerActions).type) {
    case SET_AVAILABLE_TROOPS:
      player = { ...state[action.payload.player]};
      quantity = action.payload.quantity;
      player.availableTroops = quantity;
      return { ...state, player };
    default:
      return state;
  }
};

export default reducer;