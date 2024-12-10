FROM node:18-alpine AS base

RUN npm i -g pnpm

WORKDIR /goupang-payment

COPY . /goupang-payment

RUN ls /goupang-payment -al

ARG APP_ENV
ARG NODE_ENV
ENV APP_ENV=${APP_ENV}
ENV NODE_ENV=${NODE_ENV}

RUN pnpm i

RUN pnpm run build:${APP_ENV}:${NODE_ENV}

EXPOSE 8000
CMD ["sh", "-c", "pnpm start:${APP_ENV}:${NODE_ENV}"]