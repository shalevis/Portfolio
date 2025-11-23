# ----------------------------
# 1️⃣ Build Stage (Vite React)
# ----------------------------
    FROM node:18-alpine AS builder

    WORKDIR /app
    
    # Copy only client dependencies first
    COPY client/package*.json ./ 
    RUN npm install --silent
    
    # Copy full client project
    COPY client ./ 
    RUN npm run build
    
    
    
    # ----------------------------
    # 2️⃣ Production Stage (Node Server)
    # ----------------------------
    FROM node:18-alpine
    
    WORKDIR /app
    
    # Copy only production package.json
    # (Use client/package.json)
    COPY client/package*.json ./ 
    RUN npm install --production --silent
    
    # Copy built dist folder from builder
    COPY --from=builder /app/dist ./dist
    
    # Create non-root user
    RUN addgroup -S appgroup && adduser -S appuser -G appgroup
    RUN chown -R appuser:appgroup /app
    USER appuser
    
    # Expose port 80 for your app
    EXPOSE 80
    
    # Run a simple static file server (production)
    CMD ["npx", "serve", "-s", "dist", "-l", "80"]
    