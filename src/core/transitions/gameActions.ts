import store from 'store/';
import { Countries } from 'store/country/types';

export const addTroops = (country: Countries, quantity: number) => {
  const { game, player } = store;
  store.country.incrementTroops(country, quantity);
  // store.dispatch(decrementAvailableTroops(turnOwner, quantity));
  player.decrementTroops(game.turnOwner, quantity);
};

export const attack = (from: Countries, to: Countries, quantity: number): boolean => {
  const { country } = store;
  let fromTroops = country[from].troops;
  let toTroops = country[to].troops;
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
    // store.dispatch(setTroops(to, 1)); 
    // store.dispatch(setTroops(from, fromTroops - 1));
    // store.dispatch(changeOwner(to, country[from].owner));
    return true;
  } else {
    // store.dispatch(setTroops(from, fromTroops));
    // store.dispatch(setTroops(to, toTroops));  
    country.setTroops(to, toTroops);
    country.setTroops(from, fromTroops);
    return false;
  }
};

export const move = (from: Countries, to: Countries, quantity: number) => {
  const { country } = store;
  country.decrementTroops(from, quantity);
  country.incrementTroops(to, quantity);
  // store.dispatch(decrementTroops(from, quantity));
  // store.dispatch(incrementTroops(to, quantity));
};