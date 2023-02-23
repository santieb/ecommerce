FROM node:alpine

USER node

RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY . /home/node/app
RUN npm install

CMD ["node", "dist/server.js"]
EXPOSE 3000