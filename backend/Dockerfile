FROM node:12.19.1-alpine3.12

COPY ./package.json /tmp/package.json

RUN cd /tmp && npm install && npm install -g pm2
RUN mkdir -p /usr/backend/app && cp -a /tmp/node_modules /usr/backend/app/

WORKDIR /usr/backend/app
COPY ./ /usr/backend/app

EXPOSE 8080

CMD ["sh", "/usr/backend/app/entry.sh"]