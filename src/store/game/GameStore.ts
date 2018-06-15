import { observable, action } from 'mobx';
import { GamePhase } from './types';

/*
const gameInitState: GameState = {
    round: 1,
    phase: 'INIT',
    remainingTime: 0,
    turnOwner: '',
    activePlayers: [],
    playerOrder: [],
    cardsBonus: 20,
  };  
*/

class GameStore {

  @observable round: number;
  @observable phase: GamePhase;
  @observable remainingTime: number;
  @observable turnOwner: string;
  @observable activePlayers: string[];
  @observable playerOrder: string[];
  @observable cardsBonus: number;

  constructor() {
    this.round = 1;
    this.phase = 'INIT';
    this.remainingTime = 0;
    this.turnOwner = '';
    this.activePlayers = [];
    this.playerOrder = [];
    this.cardsBonus = 20;
  }

  getCardBonus(): number {
    return this.cardsBonus;
  }

  @action setCardBonus(quantity: number) {
    this.cardsBonus = quantity;
  }

  @action nextGamePhase() {
      // TODO: - MIDDLEWARE CODE
  }

  getGamePhase(): GamePhase {
    return this.phase;
  }

  @action setGamePhase(phase: GamePhase) {
    this.phase = phase;
    // TODO: - MIDDLEWARE CODE
  }

  getTurnOwner() {
    return this.turnOwner;
  }

  @action setTurnOwner(player: string) {
    this.turnOwner = player;
  }

  getRemainingTime(): number {
    return this.remainingTime;
  } 

  @action decrementRemainingTime() {
    this.remainingTime -= 1;
  }

  @action setRemainingTime(remainingTime: number) {
    this.remainingTime = remainingTime;
  }

  getActivePlayers(): string[] {
    return this.activePlayers;
  }

  @action setActivePlayers(activePlayers: string[]) {
    this.activePlayers = activePlayers;
  }

  getPlayerOrder(): string[] {
    return this.playerOrder;
  }

  @action setPlayerOrder(playerOrder: string[]) {
    this.playerOrder = playerOrder;
  }

}

const gameStore = new GameStore();

export default gameStore;
export { GameStore };
