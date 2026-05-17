# ---- Stage 1: Build React app ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json vite.config.ts index.html ./
COPY src/ ./src/
COPY public/ ./public/
RUN npm run build

# ---- Stage 2: Serve with nginx ----
FROM nginx:alpine

# Replace default nginx config with our custom one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
