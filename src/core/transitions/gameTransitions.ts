import store from 'store/';
import { filter, map, lenght, object, keys, each } from 'utils/object';
import { difference, shuffle, partition } from 'utils/array';
import { CountryState, continentsInfo, ContinentInfo, countries as allCountries, Countries, CountryInfo } from 'store/country/types';
import { setQuantity, setSelectables, setSelecteds } from 'store/menu/actions';
import { playerCountries } from 'core/transducers/map';
import { GamePhase } from 'store/game/types';
import { PlayerState } from 'store/player/types';

import { setHover, massChangeOwner } from 'store/country/actions';
import { setTurnOwner } from 'store/game/actions';
import { incrementAvailableTroops } from 'store/player/actions';

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
  const { game, country, menu } = store.getState();
  menu.selecteds.forEach((countryName) => {
    store.dispatch(setHover(countryName, false));
  });
  menu.selectables.forEach((countryName) => {
    store.dispatch(setHover(countryName, false));
  });
  store.dispatch(setSelecteds([]));

  if (game.mode  === 'CPU' && game.activePlayer !== game.turnOwner) {
    store.dispatch(setQuantity(0));
    store.dispatch(setSelectables([]));
  } else {
    store.dispatch(setQuantity(1));
    const countries = playerCountries(game.turnOwner, country, phase === 'DISTRIBUTION' ? 0 : 1);
    store.dispatch(setSelectables(countries));
  }
};

export const nextTurnInit = () => {
  const { game, country } = store.getState();
  const nextPlayerIndex = (game.playerOrder.indexOf(game.turnOwner) + 1) % game.playerOrder.length;
  const newPlayer = game.playerOrder[nextPlayerIndex];
  // Change turn number
  store.dispatch(incrementAvailableTroops(newPlayer, computeNewTroops(newPlayer, country)));
  store.dispatch(setTurnOwner(newPlayer));
};

interface InitCountries {
  [index: string]: Countries[];
}

export const gameInit = (players: PlayerState) => {
  each(
    object(keys(players), partition(shuffle(allCountries), lenght(players))) as InitCountries,
    (countriesNames: Countries[], playerName: string) => {
      store.dispatch(massChangeOwner(countriesNames, playerName));
    }
  );
};

export const endGameVerify = () => {
  // Verify each player objective. For now only if a player has all countries
  const { country } = store.getState();
  const randomPlayer = country.Brazil.owner;
  return filter(country, (countryInfo: CountryInfo) => (countryInfo.owner !== randomPlayer)) === [];
};