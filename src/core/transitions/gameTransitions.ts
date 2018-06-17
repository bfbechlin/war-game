import store from 'store/';
import { filter, map, object, each } from 'utils/object';
import { difference, shuffle, partition } from 'utils/array';
import { CountryState, continentsInfo, ContinentInfo, countries as allCountries, Countries, CountryInfo } from 'store/country/types';
import { playerCountries } from 'core/transducers/map';
import { isActivePlayer } from 'core/transducers/player';
import { GamePhase } from 'store/game/types';

export const computeNewTroops = (player: string, country: CountryState) => {
  const countries = playerCountries(player, country);
  let newTroopsCounter = Math.ceil(countries.length / 2);
  const continentBonus = map <ContinentInfo, number> (continentsInfo, (continent: ContinentInfo) => (
    difference(continent.countries, countries).length === 0 ? continent.troopsBonus : 0
  ));
  newTroopsCounter += continentBonus.reduce((acc, value) => (acc + value), 0);
  return newTroopsCounter;
};

export const interactionInit = (phase: GamePhase) => {
  const { game, country, menu, player } = store;
  menu.selecteds.forEach((countryName) => {
    country.setHover(countryName, false);
    // store.dispatch(setHover(countryName, false));
  });
  menu.selectables.forEach((countryName) => {
    country.setHover(countryName, false);
    // store.dispatch(setHover(countryName, false));
  });

  // store.dispatch(setSelecteds([]));
  menu.setSelecteds([]);
  if (!isActivePlayer(game.turnOwner, game.activePlayers)) {
    menu.setQuantity(0);
    menu.setSelectables([]);
    // store.dispatch(setQuantity(0));
    // store.dispatch(setSelectables([]));
  } else {
    menu.setQuantity(1);
    const countries = playerCountries(game.turnOwner, country.countries, phase === 'DISTRIBUTION' ? 0 : 1);
    menu.setSelectables(countries);
  }
};

export const nextTurnInit = () => {
  const { game, country, player } = store;
  const nextPlayerIndex = (game.playerOrder.indexOf(game.turnOwner) + 1) % game.playerOrder.length;
  const newPlayer = game.playerOrder[nextPlayerIndex];
  // Change turn number
  player.incrementTroops(newPlayer, computeNewTroops(newPlayer, country.countries));
  game.setTurnOwner(newPlayer);
};

interface InitCountries {
  [index: string]: Countries[];
}

export const gameInit = (players: string[]) => {
  each(
    object(players, partition(shuffle(allCountries), players.length)) as InitCountries,
    (countriesNames: Countries[], playerName: string) => {
      store.country.massChangeOwner(countriesNames, playerName);
      // store.dispatch(massChangeOwner(countriesNames, playerName));
    }
  );
};

export const endGameReducer = () => {
  // Verify each player objective. For now only if a player has all countries
  const { country } = store;
  const randomPlayer = country.countries.Brazil.owner;
  if (filter(country, (countryInfo: CountryInfo) => (countryInfo.owner !== randomPlayer)) === []) {
    store.game.setGamePhase('FINAL');
    // dispatch(setGamePhase('FINAL'));
  }
};