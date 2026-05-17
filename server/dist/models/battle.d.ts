import { Player } from './player';
import { Pokemon } from './pokemon';
import { PokemonData, BattleStateData } from '../types';
export declare class Battle {
    private player;
    inBattle: boolean;
    wildPokemon: Pokemon | null;
    playerPokeIndex: number;
    playerTurn: boolean;
    actionLog: string[];
    constructor(player: Player);
    start(wildPokemonSpecies: string): void;
    isInBattle(): boolean;
    getState(): BattleStateData;
    getPlayerTeam(): PokemonData[];
    playerAction(actionType: number, targetIndex?: number): {
        battleEnded: boolean;
        actionLog: string;
        playerPokeHp: number;
        enemyPokeHp: number;
        playerPokeName?: string;
        enemyPokeName?: string;
        caughtPokemon?: string;
    };
    private enemyTurn;
    private handleMove;
    private useMove;
    private handleCatch;
    private handleHeal;
    private handleSwitch;
    private handleEscape;
    private checkBattleEnd;
    private buildResult;
}
