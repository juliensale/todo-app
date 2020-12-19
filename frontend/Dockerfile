FROM node:alpine3.10

MAINTAINER Julien Salé


RUN mkdir /frontend /frontend/app
WORKDIR /frontend/app
# COPY ./app/ /frontend/app/
# RUN rm -r node_modules
COPY ./app/package.json ./
RUN npm install

RUN adduser -D user
USER user
CMD [ "npm","start" ]