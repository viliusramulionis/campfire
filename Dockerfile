# ---- Build stage ----
FROM node:24-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build React app
COPY . .
RUN npm run build

# ---- Production stage ----
FROM node:24-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY server.mjs ./
COPY server ./server
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["node", "server.mjs"]