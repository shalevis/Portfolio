# ----------------------
# Stage 1 — Build Vite client
# ----------------------
    FROM node:18-alpine AS builder

    # Fix Alpine vulnerabilities
    RUN apk update && apk upgrade --no-cache
    
    WORKDIR /app
    
    # Install client dependencies
    COPY client/package*.json ./
    RUN npm install
    
    # Copy client source
    COPY client/ .
    
    # Build the Vite app
    RUN npm run build
    
    
    # ----------------------
    # Stage 2 — Serve with Node (non-root, port 80, ENTRYPOINT + CMD)
    # ----------------------
    FROM node:18-alpine
    
    # Allow Node to bind to port 80 as non-root
    RUN apk add --no-cache libcap && \
        setcap 'cap_net_bind_service=+ep' /usr/local/bin/node
    
    # Create non-root user
    RUN addgroup -S appgroup && adduser -S appuser -G appgroup
    
    WORKDIR /app
    
    # Install static server
    RUN npm install -g serve
    
    # Copy built files from builder
    COPY --from=builder /app/dist ./dist
    
    # Permissions
    RUN chown -R appuser:appgroup /app
    
    USER appuser
    
    EXPOSE 80
    
    # ----------------------
    # ENTRYPOINT + fallback CMD
    # ----------------------
    # ENTRYPOINT: what always runs (the server binary)
    ENTRYPOINT ["serve"]
    
    # CMD: default arguments (used only if user doesn't override)
    CMD ["-s", "dist", "-l", "80"]
    