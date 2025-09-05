# --- Stage 1: Build React app ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci   # лучше чем npm install для продакшена

COPY . .
RUN npm run build

# --- Stage 2: Run with nginx ---
FROM nginx:alpine

# копируем собранный билд
COPY --from=build /app/dist /usr/share/nginx/html

# если используешь кастомный конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
