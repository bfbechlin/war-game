import store from 'store/';
import { setQuantity, setSelectables, setSelecteds } from 'store/menu/actions';
import { playerCountries } from 'core/transducers/map';
import { GamePhase } from 'store/game/types';
import { setTurnOwner } from 'store/game/actions';

export const interactionInit = (phase: GamePhase) => {
  const { game, country } = store.getState();
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
  const { game } = store.getState();
  const nextPlayerIndex = (game.playerOrder.indexOf(game.turnOwner) + 1) % game.playerOrder.length;
  // Change turn number
  // Add av. troops
  store.dispatch(setTurnOwner(game.playerOrder[nextPlayerIndex]));
};
