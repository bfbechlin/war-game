import store from 'store/';
import { Countries } from 'store/country/types';
import { GamePhase } from 'store/game/types';
import { setHover } from 'store/country/actions';
import { setSelecteds, setSelectables } from 'store/menu/actions';

import { playerCountries, borderCountries } from 'core/transducers/map';

export type CountrySelection = 'HOVER-IN' | 'HOVER-OUT' | 'SELECTION-IN' | 'SELECTION-OUT';

export const singleSelectionTransition = (type: CountrySelection, country: Countries) => {
  switch (type) {
    case 'HOVER-IN':
      store.dispatch(setHover(country, true));
      break;
    case 'HOVER-OUT':
      store.dispatch(setHover(country, false));
      break;
    case 'SELECTION-IN':
      store.dispatch(setSelecteds([country]));
      store.dispatch(setSelectables([]));
      break;
    case 'SELECTION-OUT':
      const state = store.getState();
      const { turnOwner } = state.game;
      store.dispatch(setSelecteds([]));
      store.dispatch(setSelectables(playerCountries(turnOwner, state.country)));
      break;
    default:
      break;
  }
};

export const doubleSelectionTransition = (type: CountrySelection, country: Countries, sameOrigin: boolean) => {
  let state = store.getState();
  const { selecteds } = state.menu;
  const { turnOwner } = state.game;
  switch (type) {
    case 'HOVER-IN':
      store.dispatch(setHover(country, true));
      break;
    case 'HOVER-OUT':
      store.dispatch(setHover(country, false));
      break;
    case 'SELECTION-IN':
      store.dispatch(setSelecteds([...selecteds, country]));
      if (selecteds.length === 0) {
        store.dispatch(setSelectables(borderCountries(country, state.country, turnOwner, sameOrigin)));
      } else {
        store.dispatch(setSelectables([]));
      }
      break;
    case 'SELECTION-OUT':
      if (selecteds[0] === country) {
        store.dispatch(setSelecteds([]));
        store.dispatch(setSelectables(playerCountries(turnOwner, state.country)));
      } else {
        store.dispatch(setSelecteds([selecteds[0]]));
        store.dispatch(setSelectables(borderCountries(selecteds[0], state.country, turnOwner, sameOrigin)));
      }
      break;
    default:
      break;
  }
};

export const countrySelectionTransition = (phase: GamePhase, type: CountrySelection, country: Countries) => {
  switch (phase) {
    case 'DISTRIBUTION':
      return singleSelectionTransition(type, country);
    case 'ATTACK':
      return doubleSelectionTransition(type, country, false);
    case 'MOVE':
      return doubleSelectionTransition(type, country, true);
    default:
      return;
  }
};

export default countrySelectionTransition;
