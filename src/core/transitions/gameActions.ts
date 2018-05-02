import store from 'store/';
import { Countries } from 'store/country/types';
import { incrementTroops } from 'store/country/actions';
import { decrementAvailableTroops } from 'store/player/actions';

export const addTroops = (player: string, country: Countries, quantity: number) => {
  store.dispatch(incrementTroops(country, quantity));
  store.dispatch(decrementAvailableTroops(player, quantity));
};