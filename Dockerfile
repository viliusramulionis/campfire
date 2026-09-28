# ---- Build stage ----
FROM node:24-alpine3.22 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build React app
COPY . .
RUN npm run build

# ---- Production stage ----
FROM nginx:1.29-alpine

# Copy custom Nginx config (for React Router support)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output into Nginx's html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 443 for the container
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]