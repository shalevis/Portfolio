FROM node:18-alpine AS builder
WORKDIR /app

COPY client/package*.json ./
RUN npm install

COPY client/ .
RUN npm run build


# --------- NGINX Stage ----------
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

# ---- FIX PERMISSIONS (K8s-safe!) ----
RUN mkdir -p /var/cache/nginx && \
    mkdir -p /var/log/nginx && \
    mkdir -p /var/run/nginx && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    chown -R appuser:appgroup /var/run/nginx && \
    chown -R appuser:appgroup /usr/share/nginx/html
# -------------------------------------

# Run nginx as non-root
USER appuser

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
