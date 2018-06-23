import { AppStoreInterface } from 'store/';
import { CountryState, CountryInfo, Countries, borderCountries as bdCountries } from 'store/country/types';
import { GamePhase } from 'store/game/types';
import { PlayerState } from 'store/player/types';
import { ViewMode } from 'store/menu/types';
import { SelectionType, selectionTypeTransducer } from './menu';
import { filter } from 'utils/object';
import { intersection, difference } from 'utils/array';

// const borderCountries: Countries[] = [];

export interface MapStateToProps {
  players: PlayerState;
  countries: CountryState;
  selectedables: Countries[];
  selecteds: Countries[];
  gamePhase: GamePhase;
  viewMode: ViewMode;
  selectorType: SelectionType;
}

export type InteractionState = 'NORMAL' | 'HOVER' | 'SELECT';

export const MapTransducer = (store: AppStoreInterface): MapStateToProps => (
  {
    countries: store.country.countries,
    players: store.player.players,
    gamePhase: store.game.getGamePhase(),
    viewMode: store.menu.getViewMode(),
    selectedables: store.menu.getSelectables(),
    selecteds: store.menu.getSelecteds(),
    selectorType: selectionTypeTransducer(store.menu.getSelecteds(), store.game.getGamePhase()),
  }
);

export const countryOnList = (country: Countries, countries: Countries[]): boolean => {
  return countries.indexOf(country) > -1;
};

export const selectableTransducer = (country: Countries, selectablesCountries: Countries[], selectedsCountries: Countries[]): boolean => {
  return countryOnList(country, selectablesCountries) || countryOnList(country, selectedsCountries);
};

export const interactionStateTransducer = (country: Countries, countryInfo: CountryInfo, selectedsCountries: Countries[]): InteractionState => {
  let result: InteractionState;
  if (countryOnList(country, selectedsCountries)) {
    result = 'SELECT';
  } else if (countryInfo.hovered) {
    result = 'HOVER';
  } else {
    result = 'NORMAL';
  }
  return result;
};

export const possibleChoiceTransducer = 
  ( country: Countries, 
    selectablesCountries: Countries[], 
    gamePhase: GamePhase, 
    selectorType: SelectionType
  ): boolean => {
  return selectorType === 'TO' && (gamePhase === 'ATTACK' || gamePhase === 'MOVE') && countryOnList(country, selectablesCountries);
};

export const playerCountries = (player: string, countries: CountryState, minTroops: number = 0): Countries[] => (
  filter (countries, (country: CountryInfo) => ( country.owner === player && country.troops > minTroops)) as Countries[]
);

/**
 * sameOrigin:
 *  true -> ATTACK
 *  false -> MOVE
 */
export const borderCountries = (country: Countries, countries: CountryState, sameOrigin: boolean = true): Countries[] => {
  const player = countries[country].owner;
  const borders = bdCountries[country] ? bdCountries[country] : [];
  return sameOrigin ? 
    intersection(borders, playerCountries(player, countries)) as Countries[] :
    difference(borders, playerCountries(player, countries)) as Countries[] ;
};