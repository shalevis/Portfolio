# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --silent

COPY . .
RUN npm run build

# Run stage (NO NGINX)
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --silent

COPY --from=builder /app/dist ./dist
COPY server.js ./

EXPOSE 80
CMD ["node", "server.js"]
