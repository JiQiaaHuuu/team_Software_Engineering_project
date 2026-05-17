"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const pokemon_1 = require("./pokemon");
const config_1 = require("../config");
const items_1 = require("../data/items");
class Player {
    constructor(name) {
        this.name = name;
        this.team = [];
        this.storage = [];
        this.pokeballs = [config_1.STARTER_POKEBALL, config_1.STARTER_GREATBALL, config_1.STARTER_ULTRABALL, config_1.STARTER_MASTERBALL];
        this.items = (0, items_1.createStarterItems)();
        this.gold = 0;
    }
    // 从存档恢复
    static fromSaveData(save) {
        const p = new Player(save.username);
        p.name = save.username;
        p.pokeballs = save.pokeballs;
        p.items = save.items.map((it) => ({ ...it }));
        p.gold = save.gold ?? 0;
        for (const pd of save.team) {
            p.team.push(pokemon_1.Pokemon.fromData(pd));
        }
        for (const pd of save.storage) {
            p.storage.push(pokemon_1.Pokemon.fromData(pd));
        }
        return p;
    }
    // 导出存档数据
    toSaveData(currentLocation) {
        return {
            username: this.name,
            team: this.getTeamData(),
            storage: this.getStorageData(),
            pokeballs: [...this.pokeballs],
            items: this.items.map(it => ({ ...it })),
            gold: this.gold,
            currentLocation,
        };
    }
    addPokemon(p) {
        if (this.team.length < config_1.MAX_TEAM_SIZE) {
            this.team.push(p);
        }
        else {
            this.storage.push(p);
        }
    }
    getCurrentPokemon() {
        for (const p of this.team) {
            if (!p.isFainted())
                return p;
        }
        return null;
    }
    hasAlivePokemon() {
        return this.team.some(p => !p.isFainted());
    }
    getTotalBalls() {
        return this.pokeballs[0] + this.pokeballs[1] + this.pokeballs[2] + this.pokeballs[3];
    }
    getHealPotionCount() {
        for (const item of this.items) {
            if (!item.isRevive && item.healPercent > 0)
                return item.count;
        }
        return 0;
    }
    swapTeamPokemon(index1, index2) {
        if (index1 < 0 || index1 >= this.team.length || index2 < 0 || index2 >= this.team.length) {
            return false;
        }
        [this.team[index1], this.team[index2]] = [this.team[index2], this.team[index1]];
        return true;
    }
    movePokemonToStorage(teamIndex) {
        if (teamIndex < 0 || teamIndex >= this.team.length)
            return false;
        if (this.team.length <= 1)
            return false;
        this.storage.push(this.team[teamIndex]);
        this.team.splice(teamIndex, 1);
        return true;
    }
    movePokemonFromStorage(storageIndex) {
        if (storageIndex < 0 || storageIndex >= this.storage.length)
            return false;
        if (this.team.length >= config_1.MAX_TEAM_SIZE)
            return false;
        this.team.push(this.storage[storageIndex]);
        this.storage.splice(storageIndex, 1);
        return true;
    }
    useItemOnPokemon(itemIndex, pokemonIndex, isTeam) {
        if (itemIndex < 0 || itemIndex >= this.items.length)
            return false;
        const item = this.items[itemIndex];
        if (item.count <= 0)
            return false;
        if (item.isRevive)
            return false;
        const target = isTeam
            ? (pokemonIndex >= 0 && pokemonIndex < this.team.length ? this.team[pokemonIndex] : null)
            : (pokemonIndex >= 0 && pokemonIndex < this.storage.length ? this.storage[pokemonIndex] : null);
        if (!target)
            return false;
        if (target.isFainted())
            return false;
        if (item.healPercent > 0) {
            const healAmount = Math.floor(target.stats.maxHp * item.healPercent / 100);
            target.stats.hp = Math.min(target.stats.hp + healAmount, target.stats.maxHp);
        }
        if (item.expAmount > 0) {
            target.exp += item.expAmount;
            while (target.exp >= target.maxExp) {
                target.exp -= target.maxExp;
                target.level++;
                target.maxExp += config_1.EXP_LEVEL_BASE;
                target.stats.maxHp += 3;
                target.stats.hp += 3;
                target.stats.attack += 1;
                target.stats.defense += 1;
                target.stats.speed += 1;
            }
        }
        item.count--;
        return true;
    }
    revivePokemon(itemIndex, pokemonIndex) {
        if (itemIndex < 0 || itemIndex >= this.items.length)
            return false;
        const item = this.items[itemIndex];
        if (item.count <= 0)
            return false;
        if (!item.isRevive)
            return false;
        if (pokemonIndex < 0 || pokemonIndex >= this.team.length)
            return false;
        const target = this.team[pokemonIndex];
        if (!target.isFainted())
            return false;
        target.stats.hp = config_1.REVIVE_HP_AMOUNT;
        item.count--;
        return true;
    }
    getTeamData() {
        return this.team.map(p => p.toData());
    }
    getStorageData() {
        return this.storage.map(p => p.toData());
    }
}
exports.Player = Player;
