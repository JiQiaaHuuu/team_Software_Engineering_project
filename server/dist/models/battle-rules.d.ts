import { Pokemon } from './pokemon';
import { Move } from '../types';
export declare function calculateDamage(attacker: Pokemon, defender: Pokemon, move: Move, randomFactor: number): number;
export declare function calculateEscapeChance(playerSpeed: number, enemySpeed: number): number;
export declare function calculateCatchProbability(hp: number, maxHp: number, level: number, ballRate: number, isMasterBall: boolean): number;
