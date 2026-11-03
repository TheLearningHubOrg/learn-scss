# Compiles the SCSS with Dart Sass, then serves the static site with nginx.
# The old image ran `node src/index.js` (a console script) and exposed no port.

# ---- build: Node only runs the Sass compiler and the SCSS test suite -------
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY src/ ./src/
COPY tests/ ./tests/
COPY exercises/ ./exercises/
COPY examples/ ./examples/
COPY public/ ./public/
RUN npm test && npm run build

# ---- runtime: unprivileged nginx listens on 8080 ----------------------------
FROM nginxinc/nginx-unprivileged:1.29-alpine AS runtime
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/public /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:8080/health || exit 1
CMD ["nginx", "-g", "daemon off;"]
