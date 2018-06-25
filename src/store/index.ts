import { PlayerStore, PlayerStoreInterface } from './player/PlayerStore';
import { GameStore, GameStoreInterface, GameStoreDelegate } from './game/GameStore';
import { MenuStore, MenuStoreInterface } from './menu/MenuStore';
import { CountryStore, CountryStoreInterface } from './country/CountryStore';
import { avatarName } from 'utils/name';
import { GameActionResolverInterface, GameActionResolverDelegate, GameActionResolver } from 'core/transitions/gameActions';
import { CPUActionResolverDelegate, CPUActionResolverInterface, CPUActionResolver } from 'core/transitions/cpuActions';
import { CountrySelectionResolverInterface, CountrySelectionResolver } from 'core/transitions/countrySelection';
import { GameTransitionResolverDelegate, GameTransitionResolverInterface, GameTransitionResolver } from 'core/transitions/gameTransitions';

/*
export interface ApplicationState {
  country: CountryState;
  menu: MenuState;
  player: PlayerState; 
  game: GameState;
}
*/

export interface AppStoreInterface {

  gameActionResolver: GameActionResolverInterface;
  countrySelectionResolver: CountrySelectionResolverInterface;
  cpuActionResolver: CPUActionResolverInterface;
  game: GameStoreInterface;
  player: PlayerStoreInterface;
  menu: MenuStoreInterface;
  country: CountryStoreInterface;

}
/*
export const initialState: ApplicationState = { 
  country: countryStore.countries, 
  menu: menuStore.menuState, 
  player: playerStore.players, 
  game: gameStore.gameState, 
};
*/
class AppStore implements AppStoreInterface, 
                          GameActionResolverDelegate, 
                          CPUActionResolverDelegate, 
                          GameStoreDelegate,
                          GameTransitionResolverDelegate {

  game: GameStore;
  player: PlayerStoreInterface;
  menu: MenuStore;
  country: CountryStoreInterface;

  gameTransitionResolver: GameTransitionResolverInterface;
  countrySelectionResolver: CountrySelectionResolverInterface;
  gameActionResolver: GameActionResolverInterface;
  cpuActionResolver: CPUActionResolverInterface;

  constructor() {
    this.game = new GameStore(this);
    this.player = new PlayerStore();
    this.menu = new MenuStore();
    this.country = new CountryStore(this);
    this.gameActionResolver = new GameActionResolver(this);
    this.cpuActionResolver = new CPUActionResolver(this);
    this.countrySelectionResolver = new CountrySelectionResolver(this);
    this.gameTransitionResolver = new GameTransitionResolver(this);
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