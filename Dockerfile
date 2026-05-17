# ---- Stage 1: Build React frontend ----
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm ci
COPY client/tsconfig.json client/vite.config.ts client/index.html ./
COPY client/src/ ./src/
COPY client/public/ ./public/
RUN npm run build

# ---- Stage 2: Build TypeScript backend ----
FROM node:20-alpine AS server-builder
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci
COPY server/tsconfig.json ./
COPY server/src/ ./src/
RUN npm run build

# ---- Stage 3: Production runtime ----
FROM node:20-alpine
WORKDIR /app

# Copy backend production deps + compiled JS
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev
COPY --from=server-builder /app/server/dist ./dist

# Copy frontend static files (served by Express)
COPY --from=client-builder /app/client/dist ./public

ENV PORT=4010
EXPOSE 4010

CMD ["node", "dist/index.js"]
