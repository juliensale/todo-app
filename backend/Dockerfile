FROM python:3.9-alpine

MAINTAINER Julien Salé

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

RUN mkdir /backend /backend/app
WORKDIR /backend/app
COPY ./app /backend/app

RUN adduser -D user
USER user