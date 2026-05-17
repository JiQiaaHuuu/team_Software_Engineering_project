import express from 'express';
import path from 'path';
import cors from 'cors';
import gameRoutes from './routes/game-routes';
import playerRoutes from './routes/player-routes';
import mapRoutes from './routes/map-routes';
import battleRoutes from './routes/battle-routes';
import teamRoutes from './routes/team-routes';
import itemRoutes from './routes/item-routes';
import authRoutes from './routes/auth-routes';
import shopRoutes from './routes/shop-routes';
import { errorHandler } from './middleware/error-handler';

const app = express();
const PORT = parseInt(process.env.PORT || '4010', 10);

app.use(cors());
app.use(express.json());

// API 路由
app.use('/api/game', gameRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/battle', battleRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/shop', shopRoutes);

// 健康检查
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// 在生产环境中托管前端静态文件
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// SPA 路由回退：非 API 请求全部返回 index.html
app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// 全局错误处理
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`宝可梦 MUD 服务器已启动: http://127.0.0.1:${PORT}`);
  console.log(`API 文档: http://127.0.0.1:${PORT}/api/health`);
});

export default app;
