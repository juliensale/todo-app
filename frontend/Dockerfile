FROM node:alpine3.10

MAINTAINER Julien Salé


RUN mkdir /frontend /frontend/app
WORKDIR /frontend/app
COPY ./app /frontend/app
RUN yarn install
RUN npm install -g react-scripts

RUN adduser -D user
USER user
CMD [ "npm","start" ]