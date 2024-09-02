#!/bin/bash

SERVICE_NAME="goupang-user"
ENV_FILE="/home/ubuntu/$SERVICE_NAME/env/.env.prod"
DOCKER_COMPOSE_FILE="/home/ubuntu/$SERVICE_NAME/docker-compose.yml"
IMAGE_PATH="262872842537.dkr.ecr.ap-northeast-2.amazonaws.com"
IMAGE_NAME="$IMAGE_PATH/goupang/user:latest"

LOGIN_CMD="aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin $IMAGE_PATH"

if docker ps --format '{{.Names}}' | grep -q "^$SERVICE_NAME$"; then
    echo "Container $SERVICE_NAME exists. Pulling the latest image and restarting the service."

    eval $LOGIN_CMD

    docker pull $IMAGE_NAME

    docker-compose --env-file $ENV_FILE -f $DOCKER_COMPOSE_FILE -p $SERVICE_NAME up -d $SERVICE_NAME
else
    echo "Container $SERVICE_NAME does not exist. Bringing up all services."

    docker-compose --env-file $ENV_FILE -f $DOCKER_COMPOSE_FILE -p $SERVICE_NAME up -d
fi
