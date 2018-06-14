import store from 'store/';
import { Countries } from 'store/country/types';
import { incrementTroops, decrementTroops, setTroops, changeOwner } from 'store/country/actions';
import playerStore from 'store/player/PlayerStore';

export const addTroops = (country: Countries, quantity: number) => {
  const { turnOwner } = store.getState().game;
  store.dispatch(incrementTroops(country, quantity));
  // store.dispatch(decrementAvailableTroops(turnOwner, quantity));
  playerStore.decrementTroops(turnOwner, quantity);
};

export const attack = (from: Countries, to: Countries, quantity: number): boolean => {
  const { country } = store.getState();
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
    store.dispatch(setTroops(to, 1)); 
    store.dispatch(setTroops(from, fromTroops - 1));
    store.dispatch(changeOwner(to, country[from].owner));
    return true;
  } else {
    store.dispatch(setTroops(from, fromTroops));
    store.dispatch(setTroops(to, toTroops));  
    return false;
  }
};

export const move = (from: Countries, to: Countries, quantity: number) => {
  store.dispatch(decrementTroops(from, quantity));
  store.dispatch(incrementTroops(to, quantity));
};