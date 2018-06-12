import { observable } from 'mobx';
import { GameState } from './types';

const gameInitState: GameState = {
    round: 1,
    phase: 'INIT',
    remainingTime: 0,
    turnOwner: '',
    activePlayers: [],
    playerOrder: [],
    cardsBonus: 20,
  };  

class GameStore {

  @observable state: GameState;

  constructor() {
    this.state = gameInitState;
  }

}

const gameStore = new GameStore();

export default gameStore;
export { GameStore };
