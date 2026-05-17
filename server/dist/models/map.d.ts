import { LocationData } from '../types';
export declare class GameMap {
    locations: LocationData[];
    currentLocation: number;
    constructor();
    getCurrentLocation(): LocationData;
    getCurrentLocationIndex(): number;
    tryMove(direction: string): boolean;
    getAvailableDirections(): string[];
    shouldEncounter(): boolean;
    getWildPokemons(): string[];
}
