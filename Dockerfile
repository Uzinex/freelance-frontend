# --- Stage 1: Build React app ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Stage 2: Run with nginx ---
FROM nginx:alpine

# Копируем билд в nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем кастомный конфиг nginx (если есть)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# ВАЖНО: явно указываем команду запуска
CMD ["nginx", "-g", "daemon off;"]
