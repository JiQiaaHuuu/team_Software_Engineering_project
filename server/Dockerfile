# ---- Stage 1: Build ----
FROM node:20-alpine AS builder
WORKDIR /app

# Install all dependencies (including devDependencies for TypeScript)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and compile
COPY tsconfig.json ./
COPY src/ ./src/
RUN npm run build

# ---- Stage 2: Production runtime ----
FROM node:20-alpine AS runner
WORKDIR /app

# Only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy compiled JavaScript from builder
COPY --from=builder /app/dist ./dist

ENV PORT=4010
EXPOSE 4010

CMD ["node", "dist/index.js"]
