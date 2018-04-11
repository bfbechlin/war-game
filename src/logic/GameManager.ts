export class GameManager {

    turn: number;
    map: Map;
    shouldEndGame: bool;

    constructor(public players: [Controller]){}

    start(){

      this.turn = 0;
      this.shouldEndGame = false;

      while(!shouldEndGame){

        for (let players in players) {

          let action = player.resolveAction()

          while(action != Action.Pass){

            handleAction(action);

            action = player.resolveAction()

          }

        }
        this.turn += 1;
      }
    }

    handleAction(action: Action){
      switch(action) {
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
