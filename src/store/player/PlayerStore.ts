import { observable, action } from 'mobx';
import { PlayerInfo } from './types';

interface PlayerStoreInterface {

    players: {[id: string]: PlayerInfo};
    getPlayer(id: String): PlayerInfo;
    addPlayer(player: PlayerInfo): void;
    incrementTroops(playerId: String, quantity: number): void;
    decrementTroops(playerId: String, quantity: number): void;
}

class PlayerStore implements PlayerStoreInterface {

  // TODO: convert PlayerInfo to Player class

  @observable players: {[id: string]: PlayerInfo};

  constructor() {
    this.players = {};
  }

  getPlayer(id: string): PlayerInfo {
    return this.players[id];
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

export { PlayerStore, PlayerStoreInterface };
