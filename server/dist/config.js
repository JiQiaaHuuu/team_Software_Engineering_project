"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STARTER_REVIVE = exports.STARTER_EXP_POTION = exports.STARTER_HEAL_POTION = exports.STARTER_MASTERBALL = exports.STARTER_ULTRABALL = exports.STARTER_GREATBALL = exports.STARTER_POKEBALL = exports.SHOP_ITEMS = exports.GOLD_CATCH_POKEMON = exports.GOLD_WIN_BATTLE = exports.POKEMONS_PER_PAGE = exports.MAX_TEAM_SIZE = exports.MASTERBALL_CATCH_RATE = exports.CATCH_MAX_PROBABILITY = exports.CATCH_MIN_PROBABILITY = exports.CATCH_LEVEL_FACTOR_BASE = exports.ESCAPE_MAX_CHANCE = exports.ESCAPE_MIN_CHANCE = exports.ESCAPE_SPEED_MULTIPLIER = exports.ESCAPE_BASE_CHANCE = exports.ENCOUNTER_CHANCE_PERCENT = exports.REVIVE_HP_AMOUNT = exports.EXP_POTION_AMOUNT = exports.HEAL_POTION_PERCENT = exports.EXP_LEVEL_BASE = exports.EXP_BASE_GAIN = exports.MIN_DAMAGE = exports.MAX_DAMAGE_MULTIPLIER = exports.MIN_DAMAGE_MULTIPLIER = exports.STAB_MULTIPLIER = exports.DAMAGE_BASE_MULTIPLIER = void 0;
// ==================== 战斗系统配置 ====================
exports.DAMAGE_BASE_MULTIPLIER = 0.3;
exports.STAB_MULTIPLIER = 1.5;
exports.MIN_DAMAGE_MULTIPLIER = 0.85;
exports.MAX_DAMAGE_MULTIPLIER = 1.0;
exports.MIN_DAMAGE = 1;
exports.EXP_BASE_GAIN = 20;
exports.EXP_LEVEL_BASE = 50;
// ==================== 物品系统配置 ====================
exports.HEAL_POTION_PERCENT = 33;
exports.EXP_POTION_AMOUNT = 50;
exports.REVIVE_HP_AMOUNT = 1;
// ==================== 遭遇系统配置 ====================
exports.ENCOUNTER_CHANCE_PERCENT = 30;
// ==================== 逃跑系统配置 ====================
exports.ESCAPE_BASE_CHANCE = 50;
exports.ESCAPE_SPEED_MULTIPLIER = 2;
exports.ESCAPE_MIN_CHANCE = 30;
exports.ESCAPE_MAX_CHANCE = 95;
// ==================== 捕捉系统配置 ====================
exports.CATCH_LEVEL_FACTOR_BASE = 0.2;
exports.CATCH_MIN_PROBABILITY = 1.0;
exports.CATCH_MAX_PROBABILITY = 100.0;
exports.MASTERBALL_CATCH_RATE = 99.0;
// ==================== 队伍系统配置 ====================
exports.MAX_TEAM_SIZE = 6;
exports.POKEMONS_PER_PAGE = 5;
// ==================== 金币系统配置 ====================
exports.GOLD_WIN_BATTLE = 100;
exports.GOLD_CATCH_POKEMON = 50;
// ==================== 商店系统配置 ====================
exports.SHOP_ITEMS = [
    { name: '精灵球', type: 'ball', ballIndex: 0, price: 50, description: '普通精灵球，捕捉倍率1.0' },
    { name: '超级球', type: 'ball', ballIndex: 1, price: 150, description: '超级球，捕捉倍率1.5' },
    { name: '高级球', type: 'ball', ballIndex: 2, price: 300, description: '高级球，捕捉倍率2.0' },
    { name: '大师球', type: 'ball', ballIndex: 3, price: 1000, description: '大师球，几乎必中' },
    { name: '治疗药水', type: 'item', itemIndex: 0, price: 30, description: '恢复33% HP' },
    { name: '经验药水', type: 'item', itemIndex: 1, price: 60, description: '获得50经验值' },
    { name: '复活药剂', type: 'item', itemIndex: 2, price: 100, description: '复活阵亡宝可梦' },
];
// ==================== 游戏系统配置 ====================
exports.STARTER_POKEBALL = 10;
exports.STARTER_GREATBALL = 3;
exports.STARTER_ULTRABALL = 1;
exports.STARTER_MASTERBALL = 0;
exports.STARTER_HEAL_POTION = 5;
exports.STARTER_EXP_POTION = 3;
exports.STARTER_REVIVE = 2;
