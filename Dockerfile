# --- Stage 1: Build React app ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Stage 2: Run with nginx ---
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Подменяем порт 80 на $PORT и запускаем nginx
CMD ["sh", "-c", "sed -i \"s/80/${PORT}/g\" /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
