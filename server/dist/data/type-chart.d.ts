import { Type } from '../types';
export declare const TYPE_CHART: Record<number, Record<number, number>>;
export declare function getTypeEffectiveness(attackType: Type, defendType: Type): number;
export declare function getTypeName(type: Type): string;
