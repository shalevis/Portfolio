# --------------------------------------------------
# Stage 1 — Build Vite client
# --------------------------------------------------
    FROM node:18-alpine AS builder

    # Fix Alpine vulnerabilities (libxml2 etc.)
    RUN apk update && apk upgrade --no-cache
    
    WORKDIR /app
    
    # Copy only package files first
    COPY client/package*.json ./
    
    RUN npm install
    
    # Copy full client app
    COPY client/ .
    
    RUN npm run build
    
    
    
    # --------------------------------------------------
    # Stage 2 — Nginx serve
    # --------------------------------------------------
        FROM nginx:1.27-alpine

        RUN apk update && apk upgrade --no-cache
        
        # Create non-root user
        RUN addgroup -S appgroup && adduser -S appuser -G appgroup
        
        # Remove default nginx config
        RUN rm /etc/nginx/conf.d/default.conf
        
        # Add your config
        COPY nginx.conf /etc/nginx/conf.d/default.conf
        
        # Copy built frontend
        COPY --from=builder /app/dist /usr/share/nginx/html
        
        # ------------------------------
        # Fix permissions for non-root
        # ------------------------------
        RUN mkdir -p /var/cache/nginx && \
            mkdir -p /var/run && \
            mkdir -p /var/log/nginx && \
            chown -R appuser:appgroup /var/cache/nginx && \
            chown -R appuser:appgroup /var/run && \
            chown -R appuser:appgroup /var/log/nginx && \
            chown -R appuser:appgroup /usr/share/nginx/html
        # ------------------------------
        
        # Run as non-root
        USER appuser
        
        EXPOSE 80
        
        CMD ["nginx", "-g", "daemon off;"]
        