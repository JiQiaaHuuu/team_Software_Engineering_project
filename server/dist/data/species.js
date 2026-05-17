"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.START_SPECIES = exports.TYPE_MOVES = exports.COMMON_MOVES = exports.DEFAULT_SPECIES = exports.SPECIES = void 0;
const types_1 = require("../types");
function m(name, type, power, accuracy, isSpecial = false) {
    return { name, type, power, accuracy, isSpecial };
}
exports.SPECIES = {
    '小火龙': {
        species: '小火龙', type: types_1.Type.Fire,
        baseStats: { hp: 30, maxHp: 30, attack: 10, defense: 8, speed: 10 },
        specialMove: m('喷射火焰', types_1.Type.Fire, 90, 100, true),
    },
    '杰尼龟': {
        species: '杰尼龟', type: types_1.Type.Water,
        baseStats: { hp: 32, maxHp: 32, attack: 9, defense: 10, speed: 7 },
        specialMove: m('水炮', types_1.Type.Water, 110, 80, true),
    },
    '妙蛙种子': {
        species: '妙蛙种子', type: types_1.Type.Grass,
        baseStats: { hp: 31, maxHp: 31, attack: 10, defense: 9, speed: 8 },
        specialMove: m('日光束', types_1.Type.Grass, 120, 100, true),
    },
    '小拉达': {
        species: '小拉达', type: types_1.Type.Normal,
        baseStats: { hp: 25, maxHp: 25, attack: 9, defense: 7, speed: 11 },
    },
    '波波': {
        species: '波波', type: types_1.Type.Flying,
        baseStats: { hp: 26, maxHp: 26, attack: 8, defense: 8, speed: 10 },
        specialMove: m('暴风', types_1.Type.Flying, 110, 70, true),
    },
    '绿毛虫': {
        species: '绿毛虫', type: types_1.Type.Grass,
        baseStats: { hp: 24, maxHp: 24, attack: 7, defense: 7, speed: 7 },
    },
    '小雀蜂': {
        species: '小雀蜂', type: types_1.Type.Flying,
        baseStats: { hp: 23, maxHp: 23, attack: 8, defense: 7, speed: 9 },
    },
    '独角虫': {
        species: '独角虫', type: types_1.Type.Grass,
        baseStats: { hp: 24, maxHp: 24, attack: 7, defense: 7, speed: 7 },
    },
    '派拉斯': {
        species: '派拉斯', type: types_1.Type.Grass,
        baseStats: { hp: 27, maxHp: 27, attack: 9, defense: 8, speed: 6 },
    },
    '皮卡丘': {
        species: '皮卡丘', type: types_1.Type.Electric,
        baseStats: { hp: 26, maxHp: 26, attack: 10, defense: 7, speed: 12 },
        specialMove: m('十万伏特', types_1.Type.Electric, 90, 100, true),
    },
    '可达鸭': {
        species: '可达鸭', type: types_1.Type.Water,
        baseStats: { hp: 28, maxHp: 28, attack: 9, defense: 9, speed: 7 },
    },
    '小海狮': {
        species: '小海狮', type: types_1.Type.Ice,
        baseStats: { hp: 27, maxHp: 27, attack: 8, defense: 8, speed: 8 },
    },
    '角金鱼': {
        species: '角金鱼', type: types_1.Type.Water,
        baseStats: { hp: 26, maxHp: 26, attack: 9, defense: 8, speed: 9 },
    },
    '小拳石': {
        species: '小拳石', type: types_1.Type.Ground,
        baseStats: { hp: 30, maxHp: 30, attack: 10, defense: 11, speed: 5 },
    },
    '大岩蛇': {
        species: '大岩蛇', type: types_1.Type.Ground,
        baseStats: { hp: 35, maxHp: 35, attack: 9, defense: 13, speed: 6 },
    },
    '超音蝠': {
        species: '超音蝠', type: types_1.Type.Flying,
        baseStats: { hp: 25, maxHp: 25, attack: 8, defense: 7, speed: 11 },
    },
    '腕力': {
        species: '腕力', type: types_1.Type.Fighting,
        baseStats: { hp: 30, maxHp: 30, attack: 11, defense: 8, speed: 6 },
        specialMove: m('十字劈', types_1.Type.Fighting, 100, 80, true),
    },
    '地鼠': {
        species: '地鼠', type: types_1.Type.Ground,
        baseStats: { hp: 26, maxHp: 26, attack: 9, defense: 8, speed: 10 },
    },
};
exports.DEFAULT_SPECIES = {
    species: 'unknown', type: types_1.Type.Normal,
    baseStats: { hp: 25, maxHp: 25, attack: 9, defense: 9, speed: 9 },
};
// 通用技能
exports.COMMON_MOVES = [
    m('撞击', types_1.Type.Normal, 40, 100),
    m('叫声', types_1.Type.Normal, 0, 100),
];
// 属性对应的类型技能
exports.TYPE_MOVES = {
    [types_1.Type.Fire]: m('火花', types_1.Type.Fire, 40, 100),
    [types_1.Type.Water]: m('水枪', types_1.Type.Water, 40, 100),
    [types_1.Type.Grass]: m('藤鞭', types_1.Type.Grass, 45, 100),
    [types_1.Type.Electric]: m('电击', types_1.Type.Electric, 40, 100),
    [types_1.Type.Ice]: m('粉末雪', types_1.Type.Ice, 40, 100),
    [types_1.Type.Fighting]: m('踢倒', types_1.Type.Fighting, 50, 100),
    [types_1.Type.Ground]: m('掷泥', types_1.Type.Ground, 20, 100),
    [types_1.Type.Flying]: m('起风', types_1.Type.Flying, 40, 100),
};
exports.START_SPECIES = ['小火龙', '杰尼龟', '妙蛙种子'];
