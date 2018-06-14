import { observable } from 'mobx';
import { PlayerInfo } from './types';

class PlayerStore {

  // TODO: convert PlayerInfo to Player class

  @observable players: {[id: string]: PlayerInfo};

  constructor() {
    this.players = {};
  }

  addPlayer(player: PlayerInfo) {
      this.players[player.name] = player;
  }

  incrementTroops(playerId: string, quantity: number = 1) {
      this.players[playerId].availableTroops += quantity;
  }

  decrementTroops(playerId: string, quantity: number = 1) {
    this.players[playerId].availableTroops -= quantity;
  }
}

const playerStore = new PlayerStore();

export default playerStore;
export { PlayerStore };
