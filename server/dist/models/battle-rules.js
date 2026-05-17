"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDamage = calculateDamage;
exports.calculateEscapeChance = calculateEscapeChance;
exports.calculateCatchProbability = calculateCatchProbability;
const type_chart_1 = require("../data/type-chart");
const config_1 = require("../config");
function clamp(value, min, max) {
    if (value < min)
        return min;
    if (value > max)
        return max;
    return value;
}
function calculateDamage(attacker, defender, move, randomFactor) {
    const effectiveness = (0, type_chart_1.getTypeEffectiveness)(move.type, defender.type);
    if (effectiveness <= 0)
        return 0;
    const stab = move.type === attacker.type ? config_1.STAB_MULTIPLIER : 1.0;
    const clampedRandom = clamp(randomFactor, config_1.MIN_DAMAGE_MULTIPLIER, config_1.MAX_DAMAGE_MULTIPLIER);
    const baseDamage = move.power * attacker.stats.attack / defender.stats.defense * config_1.DAMAGE_BASE_MULTIPLIER;
    let damage = Math.floor(baseDamage * stab * effectiveness * clampedRandom);
    if (damage < config_1.MIN_DAMAGE)
        damage = config_1.MIN_DAMAGE;
    return damage;
}
function calculateEscapeChance(playerSpeed, enemySpeed) {
    const rawChance = config_1.ESCAPE_BASE_CHANCE + (playerSpeed - enemySpeed) * config_1.ESCAPE_SPEED_MULTIPLIER;
    return clamp(rawChance, config_1.ESCAPE_MIN_CHANCE, config_1.ESCAPE_MAX_CHANCE);
}
function calculateCatchProbability(hp, maxHp, level, ballRate, isMasterBall) {
    if (isMasterBall)
        return config_1.MASTERBALL_CATCH_RATE;
    if (maxHp <= 0)
        return config_1.CATCH_MIN_PROBABILITY;
    const hpRatio = hp / maxHp;
    const baseRate = (1.0 - hpRatio) * 100.0;
    const levelFactor = 1.0 / (1.0 + level * config_1.CATCH_LEVEL_FACTOR_BASE);
    const rawProbability = baseRate * levelFactor * ballRate;
    return clamp(rawProbability, config_1.CATCH_MIN_PROBABILITY, config_1.CATCH_MAX_PROBABILITY);
}
