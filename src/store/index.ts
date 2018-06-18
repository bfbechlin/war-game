import playerStore, { PlayerStore } from './player/PlayerStore';
import gameStore, { GameStore } from './game/GameStore';
import menuStore, { MenuStore } from './menu/MenuStore';
import countryStore, { CountryStore } from './country/CountryStore';

/*
export interface ApplicationState {
  country: CountryState;
  menu: MenuState;
  player: PlayerState; 
  game: GameState;
}
*/

export interface AppStore {
  game: GameStore;
  player: PlayerStore;
  menu: MenuStore;
  country: CountryStore;
}
/*
export const initialState: ApplicationState = { 
  country: countryStore.countries, 
  menu: menuStore.menuState, 
  player: playerStore.players, 
  game: gameStore.gameState, 
};
*/
const store: AppStore = {
  game: gameStore,
  player: playerStore,
  menu: menuStore,
  country: countryStore,
};

export default store;