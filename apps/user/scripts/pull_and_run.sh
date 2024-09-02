#!/bin/bash

ENV_FILE="/home/ubuntu/goupang-user/env/.env.prod"
DOCKER_COMPOSE_FILE="/home/ubuntu/goupang-user/docker-compose.yml"

PROJECT_NAME="goupang-user"

SERVICES=("master-node" "slave-node1" "slave-node2" "goupang-user" "nginx")

RUNNING_CONTAINERS=$(docker ps --format '{{.Names}}')

CMD="docker-compose --env-file $ENV_FILE -f $DOCKER_COMPOSE_FILE -p $PROJECT_NAME up -d"

for SERVICE in "${SERVICES[@]}"; do
    if [[ "$SERVICE" == "goupang-user" || ! $RUNNING_CONTAINERS =~ $SERVICE ]]; then
        CMD+=" $SERVICE"
    fi
done

echo "Executing command: $CMD"
eval $CMD
