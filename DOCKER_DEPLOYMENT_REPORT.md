# 宝可梦 MUD 游戏 —— Docker + GHCR 部署（单容器版）

> GitHub：https://github.com/erlang-yao/team_Software_Engineering_project  
> GHCR 镜像：`ghcr.io/erlang-yao/pokemon-mud:latest`  
> 更新日期：2026-05-17

---

## 一、新增文件清单

| 文件 | 用途 |
|---|---|
| `Dockerfile` | **根目录**单容器构建文件（前端+后端打成一个镜像） |
| `.dockerignore` | 排除 node_modules、C++ 源码等无关文件 |
| `.github/workflows/docker.yml` | CI 自动构建并推送 `pokemon-mud` 到 GHCR |
| `docker-compose.prod.yml` | 使用 GHCR 镜像一键启动 |
| `start-game.bat` | Windows 一键启动脚本 |

### 修改文件

| 文件 | 改动 |
|---|---|
| `server/src/index.ts` | 新增 `express.static` + SPA 路由回退，使 Express 直接托管前端 |
| `client/src/App.tsx` | 修复 TypeScript 编译错误 |

---

## 二、镜像结构（单容器）

```
┌─────────────────────────────────┐
│   pokemon-mud 容器 (端口 4010)   │
│                                 │
│   Express 服务器                  │
│   ├── /api/*    → 后端 API       │
│   ├── /         → React 静态文件  │
│   └── /*        → SPA 路由回退   │
└─────────────────────────────────┘
```

**关键设计**：三阶段 Docker 构建
- 阶段 1：编译 React 前端 (`vite build`)
- 阶段 2：编译 TypeScript 后端 (`tsc`)
- 阶段 3：运行镜像，Express 同时托管 API + 静态文件，只装生产依赖

---

## 三、任何人如何运行（2 条命令）

打开 PowerShell，复制粘贴：

```bash
docker pull ghcr.io/erlang-yao/pokemon-mud:latest
docker run -d -p 4010:4010 ghcr.io/erlang-yao/pokemon-mud:latest
```

浏览器打开 **http://localhost:4010** 即可游戏。

### 验证

```bash
curl http://localhost:4010/api/health
# {"status":"ok","timestamp":...}
```

### 停止

```bash
docker rm -f $(docker ps -q --filter ancestor=ghcr.io/erlang-yao/pokemon-mud:latest)
```

---

## 四、推送到 GitHub 触发 CI 构建

```bash
cd team_Software_Engineering_project
git add Dockerfile .dockerignore .github/workflows/docker.yml docker-compose.prod.yml server/src/index.ts client/src/App.tsx
git commit -m "Add single-container Docker deployment"
git push origin main
```

推送后，打开 https://github.com/erlang-yao/team_Software_Engineering_project/actions 查看构建进度。

---

## 五、常见问题

| 问题 | 解决 |
|---|---|
| `docker: command not found` | 安装 Docker Desktop：docker.com |
| `port is already allocated` | 4010 端口被占用，重启电脑或杀进程 |
| `docker pull` 报 unauthorized | GHCR 包是私有的，去 Packages 页面设为 Public |
| 页面空白 | 确认用 `http://localhost:4010`（不是 5173） |

---

## 六、与旧版（双容器）的区别

| | 双容器版 | 单容器版（当前） |
|---|---|---|
| 镜像数 | 2（server + client） | 1（pokemon-mud） |
| 启动命令 | 4 条（network + backend + frontend） | 1 条（docker run） |
| 端口 | 4010 + 5173 | 4010 |
| 需要 Docker 网络知识 | 是 | 否 |
| 适合人群 | 懂 Docker 的人 | 完全不会的陌生人 |
