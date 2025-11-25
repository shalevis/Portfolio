# ----------------------
# Stage 1 — Build Vite client
# ----------------------
    FROM node:18-alpine AS builder

    RUN apk update && apk upgrade --no-cache
    
    WORKDIR /app
    
    COPY client/package*.json ./
    RUN npm install
    
    COPY client/ .
    
    # Build Vite with correct base path
    ENV VITE_BASE=/portfolio/
    RUN npm run build
    
    
    # ----------------------
    # Stage 2 — Serve with Node (non-root, port 80)
    # ----------------------
    FROM node:18-alpine
    
    # Allow Node to bind to port 80 as non-root
    RUN apk add --no-cache libcap \
        && setcap 'cap_net_bind_service=+ep' /usr/local/bin/node
    
    # Create non-root user
    RUN addgroup -S appgroup && adduser -S appuser -G appgroup
    
    WORKDIR /app
    
    RUN npm install -g serve
    
    COPY --from=builder /app/dist ./dist
    
    RUN chown -R appuser:appgroup /app
    USER appuser
    
    EXPOSE 80
    
    ENTRYPOINT ["serve"]
    CMD ["-s", "dist", "-l", "80"]
    