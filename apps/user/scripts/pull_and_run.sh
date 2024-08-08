#!/bin/bash

aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 262872842537.dkr.ecr.ap-northeast-2.amazonaws.com

docker stop goupang-user || true
docker rm goupang-user || true

docker pull 262872842537.dkr.ecr.ap-northeast-2.amazonaws.com/goupang/user:latest

docker run -d --name goupang-user -p 8000:8000 262872842537.dkr.ecr.ap-northeast-2.amazonaws.com/goupang/user:latest