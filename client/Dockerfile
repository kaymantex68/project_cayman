FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY build /usr/share/nginx/html
# COPY default.conf /etc/nginx/conf.d

RUN apk add vim
RUN apk add htop