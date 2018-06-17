import store from 'store/';
import { avatarName } from 'utils/name';

export const initGame = (players: any, gameMode: any) => {
  players.forEach((player: any) => {
    store.player.addPlayer({
      name: player.name,
      cards: [],
      availableTroops: 0,
      color: player.color,
      avatar: avatarName(player.name)
    });

  });
  const playerOrder = players.map((item: any) => (item.name));
  const activePlayers = players.filter((item: any) => (item.controllable));
  store.game.setPlayerOrder(playerOrder);
  store.game.setTurnOwner(playerOrder[playerOrder.lenght - 1]);
  store.game.setActivePlayers(activePlayers.map((item: any) => (item.name)));
  store.game.nextGamePhase();

  // store.dispatch(setTurnOwner(playerOrder[playerOrder.lenght - 1]));
  // store.dispatch(setActivePlayers(activePlayers.map((item: any) => (item.name))));
  // store.dispatch(nextGamePhase());
};
