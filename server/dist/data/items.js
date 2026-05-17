"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStarterItems = createStarterItems;
const config_1 = require("../config");
function createStarterItems() {
    return [
        { name: '治疗药水', count: config_1.STARTER_HEAL_POTION, healAmount: 0, healPercent: config_1.HEAL_POTION_PERCENT, expAmount: 0, isRevive: false },
        { name: '经验药水', count: config_1.STARTER_EXP_POTION, healAmount: 0, healPercent: 0, expAmount: config_1.EXP_POTION_AMOUNT, isRevive: false },
        { name: '复活药剂', count: config_1.STARTER_REVIVE, healAmount: 0, healPercent: 0, expAmount: 0, isRevive: true },
    ];
}
