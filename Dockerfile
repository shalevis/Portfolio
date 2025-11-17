# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --silent

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Install only production deps
COPY package*.json ./
RUN npm install --production --silent

COPY --from=builder /app/dist ./dist
COPY server.js ./

RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 80
CMD ["node", "server.js"]
