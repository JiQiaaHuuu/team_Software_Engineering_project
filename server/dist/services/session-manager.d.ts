import { Player } from '../models/player';
import { GameMap } from '../models/map';
import { Battle } from '../models/battle';
export interface GameSession {
    sessionId: string;
    createdAt: number;
    player: Player;
    map: GameMap;
    battle: Battle;
}
declare class SessionManager {
    private sessions;
    private cleanupInterval;
    constructor();
    loginSession(username: string): GameSession;
    createSession(playerName: string, starterSpecies: string): GameSession;
    savePlayer(session: GameSession): void;
    getSession(sessionId: string): GameSession | undefined;
    deleteSession(sessionId: string): void;
    private cleanup;
    getSessionCount(): number;
}
export declare const sessionManager: SessionManager;
export {};
