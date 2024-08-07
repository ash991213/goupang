FROM node:18-alpine AS base

RUN npm i -g pnpm

ADD . /app

WORKDIR /app

RUN ls /app -al

ARG APP_ENV
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

COPY ../../ .

RUN pnpm i

RUN pnpm run build:${APP_ENV}:${NODE_ENV}

COPY ./package.json dist/apps/user/
COPY ./tsconfig.build.json dist/apps/user/
COPY ./tsconfig.json dist/apps/user/
COPY ../../libs libs/

WORKDIR /app

RUN ls /app -al

EXPOSE 8000

CMD ["sh", "-c", "pnpm start:${APP_ENV}:${NODE_ENV}"]