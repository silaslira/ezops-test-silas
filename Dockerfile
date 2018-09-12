FROM node:8.10.0
MAINTAINER Silas Lira <silas.lira@ymail.com>

VOLUME /public
WORKDIR /app

COPY . /app/
RUN npm install

CMD ["node", "/app/server.js"]
