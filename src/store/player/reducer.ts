import { Reducer } from 'redux';
import { PlayerState, 
  INCREMENT_AVAILABLE_TROOPS, 
  DECREMENT_AVAILABLE_TROOPS,
  NEW_PLAYER,
  PlayerActions
} from './types'; 

export const playerInitState: PlayerState = {
};  

const reducer: Reducer<PlayerState> = (state: PlayerState = playerInitState, action) => { 
  let quantity, player, players;
  
  switch ((action as PlayerActions).type) {
    case INCREMENT_AVAILABLE_TROOPS:
      player = { ...state[action.payload.player]};
      quantity = action.payload.quantity;
      player.availableTroops += quantity;
      return { ...state, [action.payload.player]: player };
    case DECREMENT_AVAILABLE_TROOPS:
      player = { ...state[action.payload.player]};
      quantity = action.payload.quantity;
      player.availableTroops -= quantity;
      return { ...state, [action.payload.player]: player };
    case NEW_PLAYER:
      player = action.payload.player;
      players = {...state};
      players[player.name] = player;
      return players;
    default:
      return state;
  }
};

export default reducer;