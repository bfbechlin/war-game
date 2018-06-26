import { filter, map, object, each } from 'utils/object';
import { difference, shuffle, partition } from 'utils/array';
import { continentsInfo, ContinentInfo, countries as allCountries, Countries, CountryInfo } from 'store/country/types';
import { GameStoreInterface } from 'store/game/GameStore';
import { CountryStoreInterface } from 'store/country/CountryStore';
import { PlayerStoreInterface } from 'store/player/PlayerStore';
import { MenuStoreInterface } from 'store/menu/MenuStore';
import { GamePhase } from 'store/game/types';

interface GameTransitionResolverDelegate {
  country: CountryStoreInterface;
  game: GameStoreInterface;
  player: PlayerStoreInterface;
  menu: MenuStoreInterface;
}

interface GameTransitionResolverInterface {
  delegate: GameTransitionResolverDelegate;
  computeNewTroops(player: string): void;
  interactionInit(phase: GamePhase): void;
  nextTurnInit(): void;
  gameInit(players: string[]): void;
  endGameVerify(): void;
}

interface InitCountries {
  [index: string]: Countries[];
}

class GameTransitionResolver implements GameTransitionResolverInterface {

  delegate: GameTransitionResolverDelegate;

  constructor(delegate: GameTransitionResolverDelegate) {
    this.delegate = delegate;
  }

  computeNewTroops(player: string) {
    
    const countries = this.delegate.country.playerCountries(player, 0);
    
    let newTroopsCounter = Math.ceil(countries.length / 2);
    const continentBonus = map <ContinentInfo, number> (continentsInfo, (continent: ContinentInfo) => (
      difference(continent.countries, countries).length === 0 ? continent.troopsBonus : 0
    ));
    newTroopsCounter += continentBonus.reduce((acc, value) => (acc + value), 0);
    return newTroopsCounter;
  }

  interactionInit(phase: GamePhase) {
    const { game, country, menu } = this.delegate;
    menu.selecteds.forEach((countryName) => {
      country.setHover(countryName, false);
    });
    menu.selectables.forEach((countryName) => {
      country.setHover(countryName, false);
    });
    
    menu.setSelecteds([]);
    if (!this.delegate.game.isActivePlayer()) {
      menu.setQuantity(0);
      menu.setSelectables([]);
    } else {
      menu.setQuantity(1);
      console.log(phase, phase === 'DISTRIBUTION' ? 0 : 1);
      const countries = this.delegate.country.playerCountries(game.turnOwner, phase === 'DISTRIBUTION' ? 0 : 1);
      menu.setSelectables(countries);
    }
  }

  nextTurnInit() {
    const { game, player } = this.delegate;
    const nextPlayerIndex = (game.playerOrder.indexOf(game.turnOwner) + 1) % game.playerOrder.length;
    const newPlayer = game.playerOrder[nextPlayerIndex];
    player.incrementTroops(newPlayer, this.computeNewTroops(newPlayer));
    game.setTurnOwner(newPlayer);
  }

  gameInit(players: string[]) {
    each(
      object(players, partition(shuffle(allCountries), players.length)) as InitCountries,
      (countriesNames: Countries[], playerName: string) => {
        this.delegate.country.massChangeOwner(countriesNames, playerName);
      }
    );
  }

  endGameVerify() { 
    const { country } = this.delegate;
    const randomPlayer = country.countries.Brazil.owner; 
    return filter(country, (countryInfo: CountryInfo) => (countryInfo.owner !== randomPlayer)).length === 0; 
  }

}

export { GameTransitionResolverInterface, GameTransitionResolverDelegate, GameTransitionResolver };