# FROM node:alpine

# COPY . /app

# EXPOSE 8080

# CMD node /app/server.js

FROM node:19-alpine

WORKDIR /kafka-connection

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 8080

CMD ["npm", "start"]