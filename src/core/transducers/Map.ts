import { ApplicationState } from 'store/';
import { CountryState } from 'store/country/types';
import { GameMode, GamePhase } from 'store/game/types';
import { PlayerState } from 'store/player/types';

export interface MapProps {
  countries: CountryState;
  players: PlayerState;
  gameMode: GameMode;
  gamePhase: GamePhase;
  turnOwner: string;
}

const MapTransducer = (state: ApplicationState) => (
  {
    countries: state.country,
    players: state.player,
    gameMode: state.game.mode,
    gamePhase: state.game.phase,
    turnOwner: state.game.turnOwner,
  }
);

export default MapTransducer;