# Etapa 1: build com node + ts
FROM node:22.14.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: imagem leve para produção
FROM node:22.14.0-alpine AS production

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev --prefer-offline

COPY --from=builder /app/dist ./dist
EXPOSE 3000

CMD ["node", "dist/server.js"]
