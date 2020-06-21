FROM node:10.15.1-alpine

RUN apk add git
ARG CACHEBUST=0
RUN git clone https://github.com/hugodutka/www-dom2
WORKDIR /www-dom2
RUN cd /www-dom2 && npm run-script install && npm run-script build && npm run-script createdb
