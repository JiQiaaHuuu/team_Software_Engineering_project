"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = sessionMiddleware;
const session_manager_1 = require("../services/session-manager");
function sessionMiddleware(req, res, next) {
    const sessionId = req.headers['x-session-id'];
    if (!sessionId) {
        res.status(401).json({ success: false, error: '缺少 X-Session-Id 请求头' });
        return;
    }
    const session = session_manager_1.sessionManager.getSession(sessionId);
    if (!session) {
        res.status(401).json({ success: false, error: '会话无效或已过期' });
        return;
    }
    req.gameSession = session;
    next();
}
