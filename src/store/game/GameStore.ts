import { observable, action, computed } from 'mobx';
import { GamePhase, nextPhaseResolver, GameState } from './types';
import { startClock, stopClock } from 'utils/clock';
import { interactionInit, nextTurnInit, gameInit, endGameReducer } from 'core/transitions/gameTransitions';
import cpuReducer from 'core/transitions/cpuActions';

class GameStore {

  @observable round: number;
  @observable phase: GamePhase;
  @observable remainingTime: number;
  @observable turnOwner: string;
  @observable activePlayers: string[];
  @observable playerOrder: string[];
  @observable cardsBonus: number;

  @computed get gameState(): GameState {
    return {
      round: this.round,
      phase: this.phase,
      remainingTime: this.remainingTime,
      turnOwner: this.turnOwner,
      activePlayers: this.activePlayers,
      playerOrder: this.playerOrder, 
      cardsBonus: this.cardsBonus,
    };
  }

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
      
    const actualPhase = this.phase;
    const nextPhase = nextPhaseResolver(actualPhase);

    if (actualPhase === 'INIT') {
      gameInit(this.playerOrder);
    }
    if (nextPhase === 'FINAL') {
      stopClock();
    } else {
      if (nextPhase === 'DISTRIBUTION') {
        nextTurnInit();
      }

      if (nextPhase === 'MOVE') {
        endGameReducer();
      }

      // Clock time
      stopClock();
      this.setRemainingTime(60);
      startClock(() => this.decrementRemainingTime());
      interactionInit(nextPhase);
      cpuReducer(nextPhase);

      this.phase = nextPhase;
    }
  }

  getGamePhase(): GamePhase {
    return this.phase;
  }

  @action setGamePhase(phase: GamePhase) {

    const actualPhase = this.phase;
    const nextPhase = phase;

    if (actualPhase === 'INIT') {
      gameInit(this.playerOrder);
    }
    if (nextPhase === 'FINAL') {
      stopClock();
    } else {
      if (nextPhase === 'DISTRIBUTION') {
        nextTurnInit();
      }

      if (nextPhase === 'MOVE') {
        endGameReducer();
      }

      // Clock time
      stopClock();
      this.setRemainingTime(60);
      startClock(() => this.decrementRemainingTime());
      interactionInit(nextPhase);
      cpuReducer(nextPhase);

      this.phase = nextPhase;
    }
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
    if (this.remainingTime === 1) {
      this.nextGamePhase();
    }
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
