FROM node:16

ENV NODE_ENV production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY .npmrc /usr/src/app/
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

RUN npm ci

COPY . /usr/src/app

RUN rm -f .npmrc

EXPOSE 3000
CMD ["npm", "start"]
