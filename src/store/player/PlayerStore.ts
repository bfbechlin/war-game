import { observable, action } from 'mobx';
import { PlayerInfo } from './types';

class PlayerStore {

  // TODO: convert PlayerInfo to Player class

  @observable players: {[id: string]: PlayerInfo};

  constructor() {
    this.players = {};
  }

  @action addPlayer(player: PlayerInfo) {
      this.players[player.name] = player;
  }

  @action incrementTroops(playerId: string, quantity: number = 1) {
      this.players[playerId].availableTroops += quantity;
  }

  @action decrementTroops(playerId: string, quantity: number = 1) {
    this.players[playerId].availableTroops -= quantity;
  }
}

const playerStore = new PlayerStore();

export default playerStore;
export { PlayerStore };
