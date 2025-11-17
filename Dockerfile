# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --silent

COPY . .
RUN npm run build

# ----------------------------------------------------------
# FINAL IMAGE: secure non-root Vite preview server
# ----------------------------------------------------------
FROM node:18-alpine
WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Permissions for non-root user
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 80
CMD ["npx", "vite", "preview", "--port", "80", "--host"]
