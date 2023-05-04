FROM node:19-alpine

WORKDIR /kafka-connection

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

EXPOSE 3000

EXPOSE 3001 

CMD ["npm", "start"]