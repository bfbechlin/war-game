import { GamePhase } from 'store/game/types';
import { playerCountries } from 'core/transducers/map';
import store from 'store/';
import { incrementTroops } from 'store/country/actions';

export const cpuAction = (nextPhase: GamePhase): void => {
    const { game, country } = store.getState();
    const countries = playerCountries(game.turnOwner, country, 0);
    if (nextPhase === 'DISTRIBUTION') {
        var availableTroops: number = store.getState().player[game.turnOwner].availableTroops;
        while (availableTroops > 0) {
            console.log(availableTroops);
            countries.every((value: string, index: number, array: string[]) => {
                if (availableTroops > 0) {
                    store.dispatch(incrementTroops(value, 1));
                    availableTroops = availableTroops - 1;
                    return true;
                } else {
                    return false;
                }
            });
        }
        
    } else if (nextPhase === 'ATTACK') {
        return;
    } else if (nextPhase === 'MOVE') {
        return;
    }
    return;
  };