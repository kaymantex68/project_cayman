FROM node:14.15.4-alpine

WORKDIR /usr/scr/app

COPY /server/ /usr/scr/app

EXPOSE 8000

CMD ["npm", "run", "start"]