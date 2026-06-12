FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Ejecutar el servidor de desarrollo de Vite exponiendo el host para acceso externo
CMD [ "npm", "run", "dev", "--", "--host" ]
