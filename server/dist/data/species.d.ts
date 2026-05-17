import { Type, Stats, Move } from '../types';
export interface SpeciesDef {
    species: string;
    type: Type;
    baseStats: Stats;
    specialMove?: Move;
}
export declare const SPECIES: Record<string, SpeciesDef>;
export declare const DEFAULT_SPECIES: SpeciesDef;
export declare const COMMON_MOVES: Move[];
export declare const TYPE_MOVES: Record<number, Move>;
export declare const START_SPECIES: string[];
