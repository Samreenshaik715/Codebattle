# =============================================================================
# CodeBattle Backend - Multi-stage Dockerfile
# =============================================================================

FROM node:20-alpine AS base
WORKDIR /app

RUN apk add --no-cache docker-cli

# -----------------------------------------------------------------------------
# Dependencies
# -----------------------------------------------------------------------------
FROM base AS deps
COPY package.json package-lock.json* ./
COPY apps/backend/package.json ./apps/backend/
RUN npm ci --workspace=@codebattle/backend --include-workspace-root

# -----------------------------------------------------------------------------
# Development
# -----------------------------------------------------------------------------
FROM base AS development
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/backend/node_modules ./apps/backend/node_modules
COPY package.json ./
COPY apps/backend ./apps/backend
WORKDIR /app/apps/backend
EXPOSE 4000
CMD ["npm", "run", "dev"]

# -----------------------------------------------------------------------------
# Build
# -----------------------------------------------------------------------------
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/backend/node_modules ./apps/backend/node_modules
COPY package.json ./
COPY apps/backend ./apps/backend
WORKDIR /app/apps/backend
RUN npm run db:generate && npm run build

# -----------------------------------------------------------------------------
# Production
# -----------------------------------------------------------------------------
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=build /app/apps/backend/dist ./apps/backend/dist
COPY --from=build /app/apps/backend/prisma ./apps/backend/prisma
COPY apps/backend/package.json ./apps/backend/

WORKDIR /app/apps/backend
EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
