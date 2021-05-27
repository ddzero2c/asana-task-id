FROM node:14-alpine
WORKDIR /usr/src/app

COPY package*.json yarn.lock tsconfig*.json ./
COPY src src
RUN yarn && yarn build

ENV NODE_ENV=production

USER node
EXPOSE 3000
CMD [ "node", "build/index.js" ]
