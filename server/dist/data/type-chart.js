"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPE_CHART = void 0;
exports.getTypeEffectiveness = getTypeEffectiveness;
exports.getTypeName = getTypeName;
const types_1 = require("../types");
// typeChart[attackType][defendType] = 倍率
exports.TYPE_CHART = {
    [types_1.Type.Normal]: {
        [types_1.Type.Normal]: 1, [types_1.Type.Fire]: 1, [types_1.Type.Water]: 1, [types_1.Type.Grass]: 1,
        [types_1.Type.Electric]: 1, [types_1.Type.Ice]: 1, [types_1.Type.Fighting]: 1, [types_1.Type.Ground]: 1, [types_1.Type.Flying]: 1,
    },
    [types_1.Type.Fire]: {
        [types_1.Type.Normal]: 1, [types_1.Type.Fire]: 0.5, [types_1.Type.Water]: 0.5, [types_1.Type.Grass]: 2,
        [types_1.Type.Electric]: 1, [types_1.Type.Ice]: 2, [types_1.Type.Fighting]: 1, [types_1.Type.Ground]: 1, [types_1.Type.Flying]: 1,
    },
    [types_1.Type.Water]: {
        [types_1.Type.Normal]: 1, [types_1.Type.Fire]: 2, [types_1.Type.Water]: 0.5, [types_1.Type.Grass]: 0.5,
        [types_1.Type.Electric]: 1, [types_1.Type.Ice]: 1, [types_1.Type.Fighting]: 1, [types_1.Type.Ground]: 2, [types_1.Type.Flying]: 1,
    },
    [types_1.Type.Grass]: {
        [types_1.Type.Normal]: 1, [types_1.Type.Fire]: 0.5, [types_1.Type.Water]: 2, [types_1.Type.Grass]: 0.5,
        [types_1.Type.Electric]: 1, [types_1.Type.Ice]: 1, [types_1.Type.Fighting]: 1, [types_1.Type.Ground]: 2, [types_1.Type.Flying]: 1,
    },
    [types_1.Type.Electric]: {
        [types_1.Type.Normal]: 1, [types_1.Type.Fire]: 1, [types_1.Type.Water]: 2, [types_1.Type.Grass]: 0.5,
        [types_1.Type.Electric]: 0.5, [types_1.Type.Ice]: 1, [types_1.Type.Fighting]: 1, [types_1.Type.Ground]: 0, [types_1.Type.Flying]: 2,
    },
    [types_1.Type.Ice]: {
        [types_1.Type.Normal]: 1, [types_1.Type.Fire]: 0.5, [types_1.Type.Water]: 1, [types_1.Type.Grass]: 2,
        [types_1.Type.Electric]: 1, [types_1.Type.Ice]: 0.5, [types_1.Type.Fighting]: 1, [types_1.Type.Ground]: 2, [types_1.Type.Flying]: 2,
    },
    [types_1.Type.Fighting]: {
        [types_1.Type.Normal]: 2, [types_1.Type.Fire]: 1, [types_1.Type.Water]: 1, [types_1.Type.Grass]: 1,
        [types_1.Type.Electric]: 1, [types_1.Type.Ice]: 2, [types_1.Type.Fighting]: 1, [types_1.Type.Ground]: 1, [types_1.Type.Flying]: 0.5,
    },
    [types_1.Type.Ground]: {
        [types_1.Type.Normal]: 1, [types_1.Type.Fire]: 2, [types_1.Type.Water]: 1, [types_1.Type.Grass]: 0.5,
        [types_1.Type.Electric]: 2, [types_1.Type.Ice]: 1, [types_1.Type.Fighting]: 1, [types_1.Type.Ground]: 1, [types_1.Type.Flying]: 0,
    },
    [types_1.Type.Flying]: {
        [types_1.Type.Normal]: 1, [types_1.Type.Fire]: 1, [types_1.Type.Water]: 1, [types_1.Type.Grass]: 2,
        [types_1.Type.Electric]: 0.5, [types_1.Type.Ice]: 0.5, [types_1.Type.Fighting]: 2, [types_1.Type.Ground]: 1, [types_1.Type.Flying]: 1,
    },
};
function getTypeEffectiveness(attackType, defendType) {
    return exports.TYPE_CHART[attackType]?.[defendType] ?? 1.0;
}
const TYPE_NAMES = {
    [types_1.Type.Normal]: '一般', [types_1.Type.Fire]: '火', [types_1.Type.Water]: '水',
    [types_1.Type.Grass]: '草', [types_1.Type.Electric]: '电', [types_1.Type.Ice]: '冰',
    [types_1.Type.Fighting]: '格斗', [types_1.Type.Ground]: '地面', [types_1.Type.Flying]: '飞行',
};
function getTypeName(type) {
    return TYPE_NAMES[type] ?? '未知';
}
