"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_manager_1 = require("../services/session-manager");
const session_1 = require("../middleware/session");
const locations_1 = require("../data/locations");
const species_1 = require("../data/species");
const pokemon_1 = require("../models/pokemon");
const router = (0, express_1.Router)();
// POST /api/game/start
// 支持两种模式：无session创建新游戏，有session则为已有用户添加初始宝可梦
router.post('/start', (req, res) => {
    const { playerName, starterIndex } = req.body;
    if (starterIndex == null || starterIndex < 1 || starterIndex > 3) {
        res.status(400).json({ success: false, error: 'starterIndex 必须为 1, 2, 或 3' });
        return;
    }
    const species = species_1.START_SPECIES[starterIndex - 1];
    const sessionId = req.headers['x-session-id'];
    // 已有会话（登录后选初始宝可梦）
    if (sessionId) {
        const session = session_manager_1.sessionManager.getSession(sessionId);
        if (!session) {
            res.status(401).json({ success: false, error: '会话无效' });
            return;
        }
        const starter = new pokemon_1.Pokemon(species, 5);
        session.player.addPokemon(starter);
        const loc = session.map.getCurrentLocation();
        res.json({
            sessionId: session.sessionId,
            playerName: session.player.name,
            currentLocation: loc.name,
            locationDescription: loc.description,
            totalPokeBalls: session.player.getTotalBalls(),
            teamCount: session.player.team.length,
            maxTeamSize: 6,
            team: session.player.getTeamData(),
        });
        return;
    }
    // 新建会话
    const session = session_manager_1.sessionManager.createSession(playerName || 'Red', species);
    const loc = session.map.getCurrentLocation();
    res.json({
        sessionId: session.sessionId,
        playerName: session.player.name,
        currentLocation: loc.name,
        locationDescription: loc.description,
        totalPokeBalls: session.player.getTotalBalls(),
        teamCount: session.player.team.length,
        maxTeamSize: 6,
        team: session.player.getTeamData(),
    });
});
// POST /api/game/move (per api-contract.yaml)
router.post('/move', session_1.sessionMiddleware, (req, res) => {
    const { direction } = req.body;
    const session = req.gameSession;
    if (!direction || !['e', 'w', 's', 'n'].includes(direction)) {
        res.status(400).json({ success: false, message: '无效的方向参数' });
        return;
    }
    if (session.battle.isInBattle()) {
        res.status(409).json({ success: false, message: '战斗中无法移动！' });
        return;
    }
    if (!session.map.tryMove(direction)) {
        res.status(400).json({
            success: false,
            message: '无法移动！那个方向没有路。',
        });
        return;
    }
    const newLoc = session.map.getCurrentLocation();
    const dirName = locations_1.DIRECTION_NAMES[direction] || direction;
    const message = `向${dirName}移动，来到了【${newLoc.name}】`;
    let encounterWildPokemon = false;
    let wildPokemonSpecies = null;
    if (session.map.shouldEncounter()) {
        const wildPokemons = session.map.getWildPokemons();
        const index = Math.floor(Math.random() * wildPokemons.length);
        wildPokemonSpecies = wildPokemons[index];
        encounterWildPokemon = true;
        // 预先启动战斗（前端获取 battle/state 时会拿到完整状态）
        if (session.player.hasAlivePokemon()) {
            session.battle.start(wildPokemonSpecies);
        }
    }
    res.json({
        success: true,
        message,
        encounterWildPokemon,
        wildPokemonSpecies,
        newLocation: newLoc.name,
        newLocationDescription: newLoc.description,
    });
});
exports.default = router;
