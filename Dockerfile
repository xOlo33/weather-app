#ETAP 1: Budowanie 
FROM node:20-alpine as build

WORKDIR /app

# Kopiujemy pliki z listą bibliotek
COPY package.json package-lock.json ./

# Instalujemy biblioteki
RUN npm install

# Kopiujemy cały kod aplikacji
COPY . .

# Budujemy wersję produkcyjną (tworzy folder dist)
RUN npm run build

# ETAP 2: Uruchamianie 
FROM nginx:alpine

# Kopiujemy gotowe pliki z etapu 1 do serwera Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Kopiujemy konfigurację Nginx, którą stworzyłeś w kroku 1
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Otwieramy port 80 wewnątrz kontenera
EXPOSE 80

# Uruchamiamy serwer
CMD ["nginx", "-g", "daemon off;"]