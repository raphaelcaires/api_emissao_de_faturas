# Etapa 1: build com node + ts
FROM node:22.14.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig*.json ./
COPY src ./src

RUN npm run build


# Etapa 2: imagem leve para produção
FROM node:22.14.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev --prefer-offline

COPY --from=builder /app/dist ./dist

EXPOSE 3334

CMD ["node", "dist/server.js"]