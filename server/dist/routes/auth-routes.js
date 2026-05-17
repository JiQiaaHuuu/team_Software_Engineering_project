"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_store_1 = require("../services/user-store");
const session_manager_1 = require("../services/session-manager");
const router = (0, express_1.Router)();
// POST /api/auth/register
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ success: false, error: '用户名和密码不能为空' });
        return;
    }
    if (username.length < 2 || username.length > 20) {
        res.status(400).json({ success: false, error: '用户名需2-20个字符' });
        return;
    }
    if (password.length < 3) {
        res.status(400).json({ success: false, error: '密码至少3个字符' });
        return;
    }
    const user = (0, user_store_1.registerUser)(username, password);
    if (!user) {
        res.status(409).json({ success: false, error: '用户名已存在' });
        return;
    }
    res.json({ success: true, message: '注册成功，请登录' });
});
// POST /api/auth/login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ success: false, error: '用户名和密码不能为空' });
        return;
    }
    const user = (0, user_store_1.loginUser)(username, password);
    if (!user) {
        res.status(401).json({ success: false, error: '用户名或密码错误' });
        return;
    }
    const session = session_manager_1.sessionManager.loginSession(username);
    const loc = session.map.getCurrentLocation();
    res.json({
        success: true,
        sessionId: session.sessionId,
        hasSave: !!session.player.team.length,
        playerName: session.player.name,
        gold: session.player.gold,
        currentLocation: loc.name,
        locationDescription: loc.description,
        totalPokeBalls: session.player.getTotalBalls(),
        teamCount: session.player.team.length,
        maxTeamSize: 6,
        team: session.player.getTeamData(),
    });
});
exports.default = router;
