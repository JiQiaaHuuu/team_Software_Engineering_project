import { Type, Stats, Move, PokemonData } from '../types';
export declare class Pokemon {
    name: string;
    species: string;
    type: Type;
    level: number;
    stats: Stats;
    exp: number;
    maxExp: number;
    moves: Move[];
    constructor(species: string, level: number);
    private initMoves;
    isFainted(): boolean;
    toData(): PokemonData;
    static fromData(data: PokemonData): Pokemon;
}
