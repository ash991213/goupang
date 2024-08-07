FROM node:18-alpine AS base

RUN npm i -g pnpm

ADD . /app
ADD . /app/apps/user
ADD . /app/libs

WORKDIR /app

RUN ls /app -al

ARG APP_ENV
ARG NODE_ENV
ENV APP_ENV=${APP_ENV}
ENV NODE_ENV=${NODE_ENV}

COPY . ./apps/user
COPY ../../libs/ ./libs
COPY ../../tsconfig.json .
COPY ../../package.json .

RUN pnpm i

RUN pnpm run build:${APP_ENV}:${NODE_ENV}

WORKDIR /app

RUN ls /app -al

EXPOSE 8000

CMD ["sh", "-c", "pnpm start:${APP_ENV}:${NODE_ENV}"]