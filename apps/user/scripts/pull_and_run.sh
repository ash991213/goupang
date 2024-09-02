#!/bin/bash

SERVICES=("goupang-user" "master-node" "slave-node1" "slave-node2" "nginx")

SERVICE_NAME="goupang-user"
ENV_FILE="/home/ubuntu/$SERVICE_NAME/env/.env.prod"
DOCKER_COMPOSE_FILE="/home/ubuntu/$SERVICE_NAME/docker-compose.yml"
IMAGE_PATH="262872842537.dkr.ecr.ap-northeast-2.amazonaws.com"
IMAGE_NAME="$IMAGE_PATH/goupang/user:latest"

LOGIN_CMD="aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin $IMAGE_PATH"

for service in "${SERVICES[@]}"; do

    CONTAINER_NAME="${service}"
    
    if [ "$service" == "$SERVICE_NAME" ]; then
        eval $LOGIN_CMD

        echo "Updating $SERVICE_NAME with the latest image."
        docker pull $IMAGE_NAME

        docker compose --env-file $ENV_FILE -f $DOCKER_COMPOSE_FILE -p $SERVICE_NAME up -d --force-recreate $SERVICE_NAME
    else
        if docker ps --format '{{.Names}}' | grep -q "^$CONTAINER_NAME$"; then
            echo "Service $service is already running. Skipping."
        else
            echo "Service $service is not running. Starting."
            docker compose --env-file $ENV_FILE -f $DOCKER_COMPOSE_FILE -p $SERVICE_NAME up -d $service
        fi
    fi
done
