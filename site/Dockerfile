# syntax=docker/dockerfile:1
# ── Build stage: compile the static site ──────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# ── Runtime stage: unprivileged nginx serving static files only ───────────────
# Pin by digest in production; Dependabot keeps this updated.
FROM nginxinc/nginx-unprivileged:1.29-alpine
# Drop the default config and ship our hardened one.
COPY --chown=root:root nginx/nginx.conf nginx/security-headers.conf /etc/nginx/
COPY --from=build --chown=root:root /app/dist /usr/share/nginx/html
# Files are owned by root and read-only to the nginx user (uid 101).
USER 101
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
