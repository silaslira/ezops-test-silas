FROM node:8.10.0
MAINTAINER Silas Lira <silas.lira@ymail.com>

VOLUME /public
WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

COPY . /app

CMD ["node", "/app/server.js"]
