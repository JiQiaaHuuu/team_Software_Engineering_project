"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionManager = void 0;
const uuid_1 = require("uuid");
const player_1 = require("../models/player");
const map_1 = require("../models/map");
const battle_1 = require("../models/battle");
const pokemon_1 = require("../models/pokemon");
const user_store_1 = require("./user-store");
class SessionManager {
    constructor() {
        this.sessions = new Map();
        this.cleanupInterval = setInterval(() => this.cleanup(), 30 * 60 * 1000);
    }
    // 登录已有账户（加载存档）
    loginSession(username) {
        const sessionId = (0, uuid_1.v4)();
        const save = (0, user_store_1.loadPlayerSave)(username);
        let player;
        let map;
        if (save) {
            player = player_1.Player.fromSaveData(save);
            map = new map_1.GameMap();
            map.currentLocation = save.currentLocation ?? 0;
        }
        else {
            player = new player_1.Player(username);
            map = new map_1.GameMap();
        }
        const battle = new battle_1.Battle(player);
        const session = { sessionId, createdAt: Date.now(), player, map, battle };
        this.sessions.set(sessionId, session);
        return session;
    }
    // 注册新账户 + 选初始宝可梦
    createSession(playerName, starterSpecies) {
        const sessionId = (0, uuid_1.v4)();
        const player = new player_1.Player(playerName);
        const map = new map_1.GameMap();
        const starter = new pokemon_1.Pokemon(starterSpecies, 5);
        player.addPokemon(starter);
        const battle = new battle_1.Battle(player);
        const session = { sessionId, createdAt: Date.now(), player, map, battle };
        this.sessions.set(sessionId, session);
        return session;
    }
    // 保存玩家存档
    savePlayer(session) {
        (0, user_store_1.savePlayerData)(session.player.name, session.player.toSaveData(session.map.currentLocation));
    }
    getSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (session)
            session.createdAt = Date.now();
        return session;
    }
    deleteSession(sessionId) {
        this.sessions.delete(sessionId);
    }
    cleanup() {
        const now = Date.now();
        const expiry = 2 * 60 * 60 * 1000;
        for (const [id, session] of this.sessions) {
            if (now - session.createdAt > expiry) {
                this.sessions.delete(id);
            }
        }
    }
    getSessionCount() {
        return this.sessions.size;
    }
}
exports.sessionManager = new SessionManager();
