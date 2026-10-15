# Multi-stage Dockerfile for modern Dart Sass compilation
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src/ ./src/
COPY tests/ ./tests/
RUN npm test && npm run compile

FROM node:22-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/src ./src
COPY --from=builder /app/dist ./dist
USER node
CMD ["node", "src/index.js"]