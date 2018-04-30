import { Countries } from 'store/country/types';
import { GamePhase } from 'store/game/types';

export type SelectionType = 'TO' | 'FROM';

export const selectionTypeTransducer = (selecteds: Countries[], gamePhase: GamePhase): SelectionType => {
  switch (gamePhase) {
    case 'DISTRIBUTION':
      return 'TO';
    case 'ATTACK':
    case 'MOVE':
      return selecteds.length === 0 ? 'FROM' : 'TO';
    default:
      return 'FROM';
  }
};
