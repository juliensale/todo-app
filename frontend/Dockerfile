FROM node:alpine3.10

MAINTAINER Julien Salé

RUN mkdir /frontend /frontend/app
WORKDIR /frontend/app
COPY ./app /frontend/app

RUN adduser -D user
USER user