# Stage 1 — Build the Vite app
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 — NGINX for static hosting
FROM nginx:1.27.2-alpine3.20

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy files
COPY --from=builder /app/dist /usr/share/nginx/html

# Change permissions so Nginx can read files as non-root
RUN chown -R appuser:appgroup /usr/share/nginx/html

# Switch to non-root user
USER appuser

EXPOSE 8080

# Run nginx on a non-privileged port (NO ROOT)
CMD ["nginx", "-g", "daemon off;"]
