import store from 'store/';
import { Countries } from 'store/country/types';
import { GamePhase } from 'store/game/types';
import { playerCountries, borderCountries } from 'core/transducers/map';

export type CountrySelection = 'HOVER-IN' | 'HOVER-OUT' | 'SELECTION-IN' | 'SELECTION-OUT';

export const singleSelectionTransition = (type: CountrySelection, country: Countries) => {
  switch (type) {
    case 'HOVER-IN':
      store.country.setHover(country, true);
      // .dispatch(setHover(country, true));
      break;
    case 'HOVER-OUT':
      store.country.setHover(country, false);
      // store.dispatch(setHover(country, false));
      break;
    case 'SELECTION-IN':
      // store.dispatch(setSelecteds([country]));
      // store.dispatch(setSelectables([]));
      store.menu.setSelecteds([country]);
      store.menu.setSelectables([]);
      break;
    case 'SELECTION-OUT':
      const { turnOwner } = store.game;

      store.menu.setSelecteds([]);
      store.menu.setSelectables((playerCountries(turnOwner, store.country.countries)));
      // store.dispatch(setSelecteds([]));
      // store.dispatch(setSelectables(playerCountries(turnOwner, state.country)));
      break;
    default:
      break;
  }
};

export const doubleSelectionTransition = (type: CountrySelection, country: Countries, sameOrigin: boolean) => {
  const { selecteds } = store.menu.menuState;
  const { turnOwner } = store.game;
  switch (type) {
    case 'HOVER-IN':
      // store.dispatch(setHover(country, true));
      store.country.setHover(country, true);
      break;
    case 'HOVER-OUT':
      // store.dispatch(setHover(country, false));
      store.country.setHover(country, false);
      break;
    case 'SELECTION-IN':
      // store.dispatch(setSelecteds([...selecteds, country]));
      store.menu.setSelecteds([...selecteds, country]);
      if (selecteds.length === 0) {
        // store.dispatch(setSelectables(borderCountries(country, state.country, sameOrigin)));
        store.menu.setSelectables(borderCountries(country, store.country.countries, sameOrigin));
      } else {
        // store.dispatch(setSelectables([]));
        store.menu.setSelectables([]);
      }
      break;
    case 'SELECTION-OUT':
      if (selecteds[0] === country) {
        store.menu.setSelecteds([]);
        store.menu.setSelectables(playerCountries(turnOwner, store.country.countries, 1));
        // store.dispatch(setSelecteds([]));
        // store.dispatch(setSelectables(playerCountries(turnOwner, state.country, 1)));
      } else {
        store.menu.setSelecteds([selecteds[0]]);
        store.menu.setSelectables(borderCountries(selecteds[0], store.country.countries, sameOrigin));
        // store.dispatch(setSelecteds([selecteds[0]]));
        // store.dispatch(setSelectables(borderCountries(selecteds[0], state.country, sameOrigin)));
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
