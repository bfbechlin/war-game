import playerStore from './player/PlayerStore';
import gameStore from './game/GameStore';
import menuStore from './menu/MenuStore';
import countryStore from './country/CountryStore';
import { PlayerState } from './player/types';
import { GameState } from './game/types';
import { MenuState } from './menu/types';
import { CountryState } from './country/types';

export interface ApplicationState {
  country: CountryState;
  menu: MenuState;
  player: PlayerState; 
  game: GameState;
}

export const initialState: ApplicationState = { 
  country: countryStore.countries, 
  menu: menuStore.menuState, 
  player: playerStore.players, 
  game: gameStore.gameState, 
}

const store = {
  game: gameStore,
  player: playerStore,
  menu: menuStore,
  country: countryStore,
};

export default store;