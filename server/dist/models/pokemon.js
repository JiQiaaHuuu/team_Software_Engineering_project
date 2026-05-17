"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokemon = void 0;
const species_1 = require("../data/species");
class Pokemon {
    constructor(species, level) {
        const def = species_1.SPECIES[species] ?? species_1.DEFAULT_SPECIES;
        this.name = species;
        this.species = species;
        this.type = def.type;
        this.level = level;
        this.exp = 0;
        this.maxExp = 100;
        const bs = def.baseStats;
        this.stats = {
            hp: bs.hp + level * 3,
            maxHp: bs.maxHp + level * 3,
            attack: bs.attack + level,
            defense: bs.defense + level,
            speed: bs.speed + level,
        };
        this.moves = [];
        this.initMoves(def);
    }
    initMoves(def) {
        this.moves.push({ ...species_1.COMMON_MOVES[0] });
        this.moves.push({ ...species_1.COMMON_MOVES[1] });
        const typeMove = species_1.TYPE_MOVES[this.type];
        if (typeMove) {
            this.moves.push({ ...typeMove });
        }
        if (def.specialMove) {
            this.moves.push({ ...def.specialMove });
        }
    }
    isFainted() {
        return this.stats.hp <= 0;
    }
    toData() {
        return {
            name: this.name,
            species: this.species,
            type: this.type,
            level: this.level,
            stats: { ...this.stats },
            exp: this.exp,
            maxExp: this.maxExp,
            moves: this.moves.map(m => ({ ...m })),
        };
    }
    static fromData(data) {
        const p = Object.create(Pokemon.prototype);
        p.name = data.name;
        p.species = data.species;
        p.type = data.type;
        p.level = data.level;
        p.stats = { ...data.stats };
        p.exp = data.exp;
        p.maxExp = data.maxExp;
        p.moves = data.moves.map(m => ({ ...m }));
        return p;
    }
}
exports.Pokemon = Pokemon;
