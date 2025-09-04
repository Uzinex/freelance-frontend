# --- Stage 1: Build React app ---
FROM node:22-alpine AS build
WORKDIR /app

# Сначала устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем код и собираем проект
COPY . .
RUN npm run build

# --- Stage 2: Nginx for production ---
FROM nginx:alpine

# Копируем собранный билд в стандартную директорию nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Открываем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
