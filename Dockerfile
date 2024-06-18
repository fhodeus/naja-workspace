# app base image

FROM node:18

ARG APP
ENV _APP=$APP

RUN npm i @microsoft/rush@5.35.2 --global

RUN npm install -g pnpm

WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN rush install
RUN rush update
RUN rush build -t @endeavour/back-end-api

RUN cp "./services/$_APP/.env" "./services/$_APP/dist"
RUN cd "./services/$_APP/dist"

# Create app directory

EXPOSE 3001

CMD cd "./services/$_APP/dist" && node main.js