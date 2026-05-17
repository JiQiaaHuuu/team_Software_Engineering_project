"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const game_routes_1 = __importDefault(require("./routes/game-routes"));
const player_routes_1 = __importDefault(require("./routes/player-routes"));
const map_routes_1 = __importDefault(require("./routes/map-routes"));
const battle_routes_1 = __importDefault(require("./routes/battle-routes"));
const team_routes_1 = __importDefault(require("./routes/team-routes"));
const item_routes_1 = __importDefault(require("./routes/item-routes"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const shop_routes_1 = __importDefault(require("./routes/shop-routes"));
const error_handler_1 = require("./middleware/error-handler");
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '4010', 10);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 路由
app.use('/api/game', game_routes_1.default);
app.use('/api/player', player_routes_1.default);
app.use('/api/map', map_routes_1.default);
app.use('/api/battle', battle_routes_1.default);
app.use('/api/team', team_routes_1.default);
app.use('/api/items', item_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
app.use('/api/shop', shop_routes_1.default);
// 健康检查
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
});
// 全局错误处理
app.use(error_handler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`宝可梦 MUD 服务器已启动: http://127.0.0.1:${PORT}`);
    console.log(`API 文档: http://127.0.0.1:${PORT}/api/health`);
});
exports.default = app;
