"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_1 = require("../middleware/session");
const router = (0, express_1.Router)();
// GET /api/player/status (per api-contract.yaml)
router.get('/status', session_1.sessionMiddleware, (req, res) => {
    const session = req.gameSession;
    const loc = session.map.getCurrentLocation();
    res.json({
        playerName: session.player.name,
        currentLocation: loc.name,
        locationDescription: loc.description,
        totalPokeBalls: session.player.getTotalBalls(),
        teamCount: session.player.team.length,
        maxTeamSize: 6,
        gold: session.player.gold,
    });
});
exports.default = router;
