# --- Stage 1: Build React app ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Stage 2: Run with nginx ---
FROM nginx:alpine

# Копируем билд
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем кастомный конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# ВАЖНО: запускаем nginx, а не npm
CMD ["nginx", "-g", "daemon off;"]
