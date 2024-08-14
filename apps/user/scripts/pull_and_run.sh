#!/bin/bash

set -e
set -x

echo "Starting AWS ECR login..."
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 262872842537.dkr.ecr.ap-northeast-2.amazonaws.com
echo "AWS ECR login completed."

echo "Stopping existing goupang-user container if it exists..."
docker stop goupang-user || true
echo "Existing goupang-user container stopped."

echo "Removing existing goupang-user container if it exists..."
docker rm goupang-user || true
echo "Existing goupang-user container removed."

echo "Pulling the latest Docker image from ECR..."
docker pull 262872842537.dkr.ecr.ap-northeast-2.amazonaws.com/goupang/user:latest
echo "Docker image pull completed."

echo "Running the Docker container goupang-user..."
docker run -d --name goupang-user -p 8000:8000 262872842537.dkr.ecr.ap-northeast-2.amazonaws.com/goupang/user:latest
echo "Docker container goupang-user is now running."

echo "Script execution completed successfully."
