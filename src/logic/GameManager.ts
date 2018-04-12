import { Controller } from './Controllers/ControllerInterface';
import { Action, Map } from './Support';
export class GameManager {

    turn: number;
    map: Map;
    shouldEndGame: boolean;

    constructor(public players: [Controller]) { }

    start() {

      this.turn = 0;
      this.shouldEndGame = false;

      while ( !this.shouldEndGame ) {

        for(let player of this.players) {

          let action = player.resolveAction();

          while(action !== Action.Pass) {

            this.handleAction(action);

            action = player.resolveAction();

          }

        }
        this.turn += 1;
      }
    }

    handleAction(action: Action) {
      switch( action ) {
        default: {
          break;
        }
        case Action.Attack: {
          break;
        }
        case Action.PlaceTroop: {
          break;
        }
        case Action.Forfeit: {
          break;
        }
        case Action.Ended: {
          this.shouldEndGame = true;
          break;
        }
      }
    }
}
