# Stage 1 — Build the Vite app
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --production=false

COPY . .
RUN npm run build

# Stage 2 — NGINX server for static hosting
FROM nginx:1.25-alpine

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Remove default nginx index
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from Vite build
COPY --from=builder /app/dist /usr/share/nginx/html

# Adjust permissions so non-root user can access
RUN chown -R appuser:appgroup /usr/share/nginx/html

# Switch to secure non-root user
USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
