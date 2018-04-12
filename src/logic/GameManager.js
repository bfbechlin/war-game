"use strict";
exports.__esModule = true;
var Support_1 = require("./Support");
var GameManager = /** @class */ (function () {
    function GameManager(players) {
        this.players = players;
    }
    GameManager.prototype.start = function () {
        this.turn = 0;
        this.shouldEndGame = false;
        while (!this.shouldEndGame) {
            for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
                var player = _a[_i];
                var action = player.resolveAction();
                while (action != Support_1.Action.Pass) {
                    this.handleAction(action);
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
            case Support_1.Action.Attack: {
                break;
            }
            case Support_1.Action.PlaceTroop: {
                break;
            }
            case Support_1.Action.Forfeit: {
                break;
            }
            case Support_1.Action.Ended: {
                this.shouldEndGame = true;
                break;
            }
        }
    };
    return GameManager;
}());
exports.GameManager = GameManager;
