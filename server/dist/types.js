"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokeBallType = exports.Type = void 0;
// ==================== 枚举 ====================
var Type;
(function (Type) {
    Type[Type["Normal"] = 0] = "Normal";
    Type[Type["Fire"] = 1] = "Fire";
    Type[Type["Water"] = 2] = "Water";
    Type[Type["Grass"] = 3] = "Grass";
    Type[Type["Electric"] = 4] = "Electric";
    Type[Type["Ice"] = 5] = "Ice";
    Type[Type["Fighting"] = 6] = "Fighting";
    Type[Type["Ground"] = 7] = "Ground";
    Type[Type["Flying"] = 8] = "Flying";
})(Type || (exports.Type = Type = {}));
var PokeBallType;
(function (PokeBallType) {
    PokeBallType[PokeBallType["PokeBall"] = 0] = "PokeBall";
    PokeBallType[PokeBallType["GreatBall"] = 1] = "GreatBall";
    PokeBallType[PokeBallType["UltraBall"] = 2] = "UltraBall";
    PokeBallType[PokeBallType["MasterBall"] = 3] = "MasterBall";
})(PokeBallType || (exports.PokeBallType = PokeBallType = {}));
