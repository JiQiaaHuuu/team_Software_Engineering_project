import { Pokemon } from './pokemon';
import { Item, PokemonData } from '../types';
import { PlayerSaveData } from '../services/user-store';
export declare class Player {
    name: string;
    team: Pokemon[];
    storage: Pokemon[];
    pokeballs: [number, number, number, number];
    items: Item[];
    gold: number;
    constructor(name: string);
    static fromSaveData(save: PlayerSaveData): Player;
    toSaveData(currentLocation: number): PlayerSaveData;
    addPokemon(p: Pokemon): void;
    getCurrentPokemon(): Pokemon | null;
    hasAlivePokemon(): boolean;
    getTotalBalls(): number;
    getHealPotionCount(): number;
    swapTeamPokemon(index1: number, index2: number): boolean;
    movePokemonToStorage(teamIndex: number): boolean;
    movePokemonFromStorage(storageIndex: number): boolean;
    useItemOnPokemon(itemIndex: number, pokemonIndex: number, isTeam: boolean): boolean;
    revivePokemon(itemIndex: number, pokemonIndex: number): boolean;
    getTeamData(): PokemonData[];
    getStorageData(): PokemonData[];
}
