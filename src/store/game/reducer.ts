import { Reducer } from 'redux';
import { 
  GameState, 
  GameActions, 
  SET_CARDS_BONUS, 
  SET_GAME_PHASE,
  SET_TURN_OWNER 
} from './types'; 

export const gameInitState: GameState = {
  round: 1,
  mode: 'PVP',
  phase: 'DISTRIBUTION',
  remainingTime: 20,
  turnOwner: 'PLAYER_1',
  activePlayer: null,
  cardsBonus: 20,
};  

const reducer: Reducer<GameState> = (state: GameState = gameInitState, action) => { 
  switch ((action as GameActions).type) {
    case SET_CARDS_BONUS:
      return { ...state, cardsBonus: action.payload.quantity };
    case SET_GAME_PHASE:
      return { ...state, phase: action.payload.phase};
    case SET_TURN_OWNER:
      return { ...state, turnOwner: action.payload.player};
    default:
      return state;
  }
};

export default reducer;