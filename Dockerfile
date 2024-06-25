#Использование linux alpine с nodejs
FROM node:20.11.1-alpine

#директория рабочей области
WORKDIR /app

#Скопировать package.json и package-lock.json внутрь контейнера
COPY package*.json ./

#Установить зависисмости
RUN npm install

#Копируем оставшееся приложжение в контейнер
COPY . .

#Установить prisma
RUN npm install -g prisma

#Генерируем prisma client
RUN prisma generate

#Копировать prisma schema
COPY prisma/schema.prisma ./prisma/

#Открыть порт в контейнере
EXPOSE 3001

#Запуск сервера
CMD ["npm", "start"]