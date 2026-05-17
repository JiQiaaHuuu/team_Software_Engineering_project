export interface UserRecord {
    username: string;
    passwordHash: string;
    createdAt: string;
}
export interface PlayerSaveData {
    username: string;
    team: any[];
    storage: any[];
    pokeballs: number[];
    items: any[];
    gold: number;
    currentLocation: number;
}
export declare function loadUsers(): Record<string, UserRecord>;
export declare function registerUser(username: string, password: string): UserRecord | null;
export declare function loginUser(username: string, password: string): UserRecord | null;
export declare function loadPlayerSave(username: string): PlayerSaveData | null;
export declare function savePlayerData(username: string, data: PlayerSaveData): void;
