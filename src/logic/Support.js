"use strict";
exports.__esModule = true;
var Action;
(function (Action) {
    Action[Action["PlaceTroop"] = 0] = "PlaceTroop";
    Action[Action["Attack"] = 1] = "Attack";
    Action[Action["Pass"] = 2] = "Pass";
    Action[Action["Forfeit"] = 3] = "Forfeit";
    Action[Action["Ended"] = 4] = "Ended";
})(Action = exports.Action || (exports.Action = {}));
var Map = /** @class */ (function () {
    function Map() {
    }
    return Map;
}());
exports.Map = Map;
