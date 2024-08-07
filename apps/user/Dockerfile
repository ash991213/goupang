FROM node:18-alpine AS base

RUN npm i -g pnpm 

ADD . /app

WORKDIR /app

RUN ls /app -al

ARG APP_ENV
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

COPY . .

RUN pnpm run build:${APP_ENV}:${NODE_ENV}

COPY apps/user/package.json dist/apps/user/
COPY apps/user/tsconfig.build.json dist/apps/user/
COPY apps/user/tsconfig.json dist/apps/user/
COPY libs/module/ libs/module/
COPY libs/util/ libs/util/

WORKDIR /app

RUN ls /app -al

EXPOSE 8000

CMD ["sh", "-c", "pnpm start:${APP_ENV}:${NODE_ENV}"]