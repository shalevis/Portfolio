FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --silent

# Copy source
COPY . .

# Build the Vite app
RUN npm run build

# ----------------------------------------------------------
# FINAL IMAGE: use vite preview server (no nginx, no express)
# ----------------------------------------------------------
FROM node:18-alpine
WORKDIR /app

# Install only prod deps (vite is already inside node_modules)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 80

CMD ["npx", "vite", "preview", "--port", "80", "--host"]
