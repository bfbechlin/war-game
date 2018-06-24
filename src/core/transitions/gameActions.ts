import store from 'store/';
import { Countries } from 'store/country/types';
import { CountryStoreInterface } from 'store/country/CountryStore';
import { GameStore } from 'store/game/GameStore';
import { PlayerStoreInterface } from 'store/player/PlayerStore';

interface GameActionResolverDelegate {
  country: CountryStoreInterface;
  game: GameStore;
  player: PlayerStoreInterface;
}

interface GameActionResolverInterface {

  delegate?: GameActionResolverDelegate;
  addTroops(country: Countries, quantity: number): void;
  attack(from: Countries, to: Countries, quantity: number): boolean;
  move(from: Countries, to: Countries, quantity: number): void;

}

class GameActionResolver implements GameActionResolverInterface {

  delegate: GameActionResolverDelegate;

  constructor(delegate: GameActionResolverDelegate) {
    this.delegate = delegate;
  }

  addTroops(country: Countries, quantity: number): void {
    const { game, player } = store;
    store.country.incrementTroops(country, quantity);
    player.decrementTroops(game.turnOwner, quantity);
  }

  attack(from: Countries, to: Countries, quantity: number): boolean {
    const { country } = store;
    let fromTroops = country.countries[from].troops;
    let toTroops = country.countries[to].troops;
    for (let i = 0; i < quantity; i++) {
      if (fromTroops < 2 || toTroops < 1) {
        break;
      }
      const attackSucessful = Math.random() < 0.45;
      fromTroops -= attackSucessful ? 0 : 1;
      toTroops -= attackSucessful ? 1 : 0;
    }
    
    if (toTroops === 0) {
      country.setTroops(to, 1);
      country.setTroops(from, fromTroops - 1);
      country.changeOwner(to, country.countries[from].owner);
      return true;
    } else {
      country.setTroops(to, toTroops);
      country.setTroops(from, fromTroops);
      return false;
    }
  }
  move(from: Countries, to: Countries, quantity: number): void {
    const { country } = store;
    country.decrementTroops(from, quantity);
    country.incrementTroops(to, quantity);
  }
}

export { GameActionResolverInterface, GameActionResolver, GameActionResolverDelegate };