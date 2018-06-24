import { observable, action, computed } from 'mobx';
import { GamePhase, nextPhaseResolver, GameState } from './types';
import { startClock, stopClock } from 'utils/clock';
import { interactionInit, nextTurnInit, gameInit, endGameReducer } from 'core/transitions/gameTransitions';
import { CPUActionResolverInterface } from 'core/transitions/cpuActions';

interface GameStoreInterface {

  delegate: GameStoreDelegate;
  round: number;
  phase: GamePhase;
  remainingTime: number;
  turnOwner: string;
  activePlayers: string[];
  playerOrder: string[];
  cardsBonus: number;
  readonly gameState: GameState;
  getCardBonus(): number;
  setCardBonus(quantity: number): void;
  nextGamePhase(): void;
  getGamePhase(): GamePhase;
  setGamePhase(phase: GamePhase): void;
  getTurnOwner(): string;
  setTurnOwner(player: string): void;
  getRemainingTime(): number;
  decrementRemainingTime(): void;
  setRemainingTime(remainingTime: number): void;
  getActivePlayers(): string[];
  setActivePlayers(activePlayers: string[]): void;
  getPlayerOrder(): string[];
  setPlayerOrder(playerOrder: string[]): void;

}

class GameStoreDelegate {
  cpuActionResolver: CPUActionResolverInterface;
}

class GameStore implements GameStoreInterface {

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

  delegate: GameStoreDelegate;

  constructor(delegate: GameStoreDelegate) {
    this.delegate = delegate;
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
      this.delegate.cpuActionResolver.resolveCPUAction(nextPhase);

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
      this.delegate.cpuActionResolver.resolveCPUAction(nextPhase);

      this.phase = nextPhase;
    }
  }

  getTurnOwner(): string {
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

// const gameStore = new GameStore();

// export default gameStore;

export { GameStore, GameStoreInterface, GameStoreDelegate };
