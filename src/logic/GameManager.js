"use strict";
exports.__esModule = true;
var GameManager = /** @class */ (function () {
    function GameManager(players) {
        this.players = players;
    }
    GameManager.prototype.start = function () {
        this.turn = 0;
        this.shouldEndGame = false;
        while (!shouldEndGame) {
            for (var players in players) {
                var action = player.resolveAction();
                while (action != Action.Pass) {
                    handleAction(action);
                    action = player.resolveAction();
                }
            }
            this.turn += 1;
        }
    };
    GameManager.prototype.handleAction = function (action) {
        switch (action) {
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
    };
    return GameManager;
}());
exports.GameManager = GameManager;
