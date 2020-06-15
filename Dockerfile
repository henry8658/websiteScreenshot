FROM node:12.18.0-alpine

WORKDIR /app

COPY package.json /app

RUN npm install --production

COPY . /app

CMD npm start

EXPOSE 8080
