import store from 'store/';
import { newPlayer } from 'store/player/actions';
import { avatarName } from 'utils/name';
import { nextGamePhase, setPlayerOrder, setTurnOwner, setActivePlayers } from 'store/game/actions';

export const initGame = (players: any, gameMode: any) => {
  players.forEach((player: any) => {
    store.dispatch(newPlayer({
      name: player.name,
      cards: [],
      availableTroops: 0,
      color: player.color,
      avatar: avatarName(player.name)
    }));
  });
  const playerOrder = players.map((item: any) => (item.name));
  const activePlayers = players.filter((item: any) => (item.controllable));
  store.dispatch(setPlayerOrder(playerOrder));
  store.dispatch(setTurnOwner(playerOrder[playerOrder.lenght - 1]));
  store.dispatch(setActivePlayers(activePlayers.map((item: any) => (item.name))));
  store.dispatch(nextGamePhase());
};
