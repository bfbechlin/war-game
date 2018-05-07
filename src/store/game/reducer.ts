import { Reducer } from 'redux';
import { 
  GameState, 
  GameActions,
  SET_CARDS_BONUS, 
  SET_GAME_PHASE,
  NEXT_GAME_PHASE,
  SET_TURN_OWNER,
  DECREMENT_REMAINING_TIME,
  SET_REMAINING_TIME,
  nextPhaseResolver
} from './types'; 

export const gameInitState: GameState = {
  round: 1,
  mode: 'CPU',
  phase: 'INIT',
  remainingTime: 20,
  turnOwner: 'PLAYER_1',
  activePlayer: 'PLAYER_1',
  playerOrder: ['PLAYER_1', 'PLAYER_2'],
  cardsBonus: 20,
};  

const reducer: Reducer<GameState> = (state: GameState = gameInitState, action) => { 
  switch ((action as GameActions).type) {
    case SET_CARDS_BONUS:
      return { ...state, cardsBonus: action.payload.quantity };
    case SET_GAME_PHASE:
      return { ...state, phase: action.payload.phase};
    case NEXT_GAME_PHASE:
      return { ...state, phase: nextPhaseResolver(state.phase)};
    case SET_TURN_OWNER:
      return { ...state, turnOwner: action.payload.player};
    case DECREMENT_REMAINING_TIME:
      return { ...state, remainingTime: state.remainingTime - 1};
    case SET_REMAINING_TIME:
      return { ...state, remainingTime: action.payload.remainingTime};
    default:
      return state;
  }
};

export default reducer;