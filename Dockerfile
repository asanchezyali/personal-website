FROM node:alpine

RUN mkdir -p /opt/src
WORKDIR /opt/src

COPY . /opt/src

RUN yarn install
RUN yarn build

EXPOSE 3000
CMD yarn start
