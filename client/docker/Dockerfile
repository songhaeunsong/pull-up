FROM node:lts

WORKDIR /app

COPY ../package*.json ./

RUN npm install

COPY ../ ./

RUN npm run build

ENTRYPOINT [ "npm", "run", "dev" ]

EXPOSE 5173