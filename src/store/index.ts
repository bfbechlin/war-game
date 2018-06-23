import { PlayerStore } from './player/PlayerStore';
import { GameStore } from './game/GameStore';
import { MenuStore } from './menu/MenuStore';
import { CountryStore, CountryStoreInterface } from './country/CountryStore';
import { avatarName } from 'utils/name';

/*
export interface ApplicationState {
  country: CountryState;
  menu: MenuState;
  player: PlayerState; 
  game: GameState;
}
*/

export interface AppStoreInterface {
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
class AppStore implements AppStoreInterface {

  game: GameStore;
  player: PlayerStore;
  menu: MenuStore;
  country: CountryStoreInterface;

  constructor() {
    this.game = new GameStore();
    this.player = new PlayerStore();
    this.menu = new MenuStore();
    this.country = new CountryStore();
  }

  initGame(players: any, gameMode: any): void {
    players.forEach((player: any) => {
      this.player.addPlayer({
        name: player.name,
        cards: [],
        availableTroops: 0,
        color: player.color,
        avatar: avatarName(player.name)
      });
  
    });
    const playerOrder = players.map((item: any) => (item.name));
    const activePlayers = players.filter((item: any) => (item.controllable));
    this.game.setPlayerOrder(playerOrder);
    this.game.setTurnOwner(playerOrder[playerOrder.lenght - 1]);
    this.game.setActivePlayers(activePlayers.map((item: any) => (item.name)));
    this.game.nextGamePhase();
  }
}

const store = new AppStore();

export default store;