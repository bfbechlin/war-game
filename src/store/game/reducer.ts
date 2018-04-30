import { Reducer } from 'redux';
import { GameState, SET_CARDS_BONUS, GameActions } from './types'; 

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
  let cardsBonus;
  switch ((action as GameActions).type) {
    case SET_CARDS_BONUS:
      cardsBonus = action.payload.quantity;
      return { ...state, cardsBonus };
    default:
      return state;
  }
};

export default reducer;