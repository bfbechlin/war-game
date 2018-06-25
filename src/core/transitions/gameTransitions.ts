//import store from 'store/';
import { filter, map, object, each } from 'utils/object';
import { difference, shuffle, partition } from 'utils/array';
import { continentsInfo, ContinentInfo, countries as allCountries, Countries, CountryInfo } from 'store/country/types';
import { playerCountries } from 'core/transducers/map';
import { isActivePlayer } from 'core/transducers/player';
import { GameStoreInterface } from 'store/game/GameStore';
import { CountryStoreInterface } from 'store/country/CountryStore';
import { PlayerStoreInterface } from 'store/player/PlayerStore';
import { MenuStoreInterface } from 'store/menu/menuStore';

interface GameTransitionResolverDelegate {
  country: CountryStoreInterface;
  game: GameStoreInterface;
  player: PlayerStoreInterface;
  menu: MenuStoreInterface;
}

interface GameTransitionResolverInterface {
  delegate: GameTransitionResolverDelegate;
  computeNewTroops(player: string): void;
  interactionInit(): void;
  nextTurnInit(): void;
  gameInit(players: string[]): void;
  endGameReducer(): void;
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
    
    const countries = playerCountries(player, this.delegate.country.countries);
    
    let newTroopsCounter = Math.ceil(countries.length / 2);
    const continentBonus = map <ContinentInfo, number> (continentsInfo, (continent: ContinentInfo) => (
      difference(continent.countries, countries).length === 0 ? continent.troopsBonus : 0
    ));
    newTroopsCounter += continentBonus.reduce((acc, value) => (acc + value), 0);
    return newTroopsCounter;
  }

  interactionInit() {
    const { game, country, menu } = this.delegate;
    menu.selecteds.forEach((countryName) => {
      country.setHover(countryName, false);
    });
    menu.selectables.forEach((countryName) => {
      country.setHover(countryName, false);
    });
    
    menu.setSelecteds([]);
    if (!isActivePlayer(game.turnOwner, game.activePlayers)) {
      menu.setQuantity(0);
      menu.setSelectables([]);
    } else {
      menu.setQuantity(1);
      const countries = playerCountries(game.turnOwner, country.countries, this.delegate.game.phase === 'DISTRIBUTION' ? 0 : 1);
      menu.setSelectables(countries);
    }
  }

  nextTurnInit() {
    const { game, player } = this.delegate;
    const nextPlayerIndex = (game.playerOrder.indexOf(game.turnOwner) + 1) % game.playerOrder.length;
    const newPlayer = game.playerOrder[nextPlayerIndex];
    // Change turn number
    // console.log(player.getPlayer(newPlayer));
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

endGameReducer() {
    // Verify each player objective. For now only if a player has all countries
    const { country } = this.delegate;
    const randomPlayer = country.countries.Brazil.owner;
    if (filter(country, (countryInfo: CountryInfo) => (countryInfo.owner !== randomPlayer)) === []) {
      this.delegate.game.setGamePhase('FINAL');
    }
  }

}

export{ GameTransitionResolverInterface, GameTransitionResolverDelegate, GameTransitionResolver };