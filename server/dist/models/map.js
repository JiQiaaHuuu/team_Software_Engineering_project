"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameMap = void 0;
const locations_1 = require("../data/locations");
const config_1 = require("../config");
class GameMap {
    constructor() {
        this.locations = locations_1.LOCATIONS.map(loc => ({
            ...loc,
            connections: { ...loc.connections },
            wildPokemons: [...loc.wildPokemons],
        }));
        this.currentLocation = 0;
    }
    getCurrentLocation() {
        return this.locations[this.currentLocation];
    }
    getCurrentLocationIndex() {
        return this.currentLocation;
    }
    tryMove(direction) {
        const current = this.locations[this.currentLocation];
        if (!(direction in current.connections))
            return false;
        this.currentLocation = current.connections[direction];
        return true;
    }
    getAvailableDirections() {
        return Object.keys(this.locations[this.currentLocation].connections);
    }
    shouldEncounter() {
        const current = this.locations[this.currentLocation];
        if (current.wildPokemons.length === 0)
            return false;
        return Math.random() * 100 < config_1.ENCOUNTER_CHANCE_PERCENT;
    }
    getWildPokemons() {
        return this.locations[this.currentLocation].wildPokemons;
    }
}
exports.GameMap = GameMap;
