#!/bin/bash

ENV_FILE="/home/ubuntu/goupang-user/env/.env.prod"
PROJECT_NAME="goupang-user"
SERVICES=("master-node" "slave-node1" "slave-node2" "goupang-user" "nginx")

RUNNING_CONTAINERS=$(docker ps --format '{{.Names}}')

CMD="docker-compose --env-file $ENV_FILE -p $PROJECT_NAME"

for SERVICE in "${SERVICES[@]}"; do
    if [[ "$SERVICE" == "goupang-user" || ! $RUNNING_CONTAINERS =~ $SERVICE ]]; then
        CMD+=" $SERVICE"
    fi
done

CMD+="up -d"

echo "Executing command: $CMD"
eval $CMD
