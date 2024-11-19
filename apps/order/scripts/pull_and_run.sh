#!/bin/bash

SERVICES=("goupang-order" "nginx")

SERVICE_NAME="goupang-order"
ENV_FILE="/home/ubuntu/$SERVICE_NAME/env/.env.prod"
DOCKER_COMPOSE_FILE="/home/ubuntu/$SERVICE_NAME/docker-compose.yml"
IMAGE_PATH="262872842537.dkr.ecr.ap-northeast-2.amazonaws.com"
IMAGE_NAME="$IMAGE_PATH/goupang/order:latest"

LOGIN_CMD="aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin $IMAGE_PATH"

for service in "${SERVICES[@]}"; do
    CONTAINER_NAME="${service}"

    if [ "$service" == "$SERVICE_NAME" ]; then
        echo "Updating $SERVICE_NAME to use the latest image."

        if docker ps -a --format '{{.Names}}' | grep $CONTAINER_NAME; then
            if docker ps --format '{{.Names}}' | grep $CONTAINER_NAME; then
                echo "Stopping running container $CONTAINER_NAME..."
                docker stop $CONTAINER_NAME
            fi

            echo "Removing old container $CONTAINER_NAME..."
            docker rm $CONTAINER_NAME
        fi

        eval $LOGIN_CMD

        echo "Pulling the latest image for $SERVICE_NAME..."
        docker pull $IMAGE_NAME

        echo "Starting $SERVICE_NAME with the latest image..."
        docker compose --env-file $ENV_FILE -f $DOCKER_COMPOSE_FILE up -d --build
    else
        if docker ps -a --format '{{.Names}}' | grep $CONTAINER_NAME; then
            if ! docker ps --format '{{.Names}}' | grep $CONTAINER_NAME; then
                echo "Service $service is not running. Restarting."
                docker compose --env-file $ENV_FILE -f $DOCKER_COMPOSE_FILE up -d --force-recreate $service
            else
                echo "Service $service is already running. Skipping."
            fi
        else
            echo "Service $service is not present. Starting."
            docker compose --env-file $ENV_FILE -f $DOCKER_COMPOSE_FILE up -d $service --build
        fi
    fi
done
