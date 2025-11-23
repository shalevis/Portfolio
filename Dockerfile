# Stage 1 — Build Vite client
FROM node:18-alpine AS builder
WORKDIR /app

# Copy only client package files first
COPY client/package*.json ./

RUN npm install

# Copy rest of client source
COPY client/ .

RUN npm run build

# Stage 2 — Nginx serve
FROM nginx:1.27.2-alpine3.20

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Add custom config to listen on 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Owner permissions
RUN chown -R appuser:appgroup /usr/share/nginx/html

# Non-root user
USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
