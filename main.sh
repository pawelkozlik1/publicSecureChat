#!/usr/bin/bash

docker_compose_frontend="docker/docker-compose-frontend.yaml"
docker_compose_auth="docker/docker-compose-auth.yaml"
docker_compose_be="docker/docker-compose-be.yaml"
docker_compose_chat="docker/docker-compose-chat.yaml"

frontend_build() {
  docker-compose -f $docker_compose_frontend build
}

frontend_up() {
  docker-compose -f $docker_compose_frontend up -d
}

auth_build() {
  docker-compose -f $docker_compose_auth build
}

auth_up() {
  docker-compose -f $docker_compose_auth up -d
}

be_up() {
  docker-compose -f $docker_compose_be up -d
}

chat_build() {
  docker-compose -f $docker_compose_chat build
}

chat_up() {
  docker-compose -f $docker_compose_chat up -d
}

full_auth() {
  auth_up
  frontend_up
}

full_be() {
  be_up
  frontend_up
}

full_up() {
  auth_up
  be_up
  frontend_up
  chat_up
}

follow_auth() {
  docker-compose -f $docker_compose_auth -f $docker_compose_frontend logs --follow --tail 500
}

clear_all() {
  docker stop $(docker ps -a -q)
  docker rm $(docker ps -a -q)
}

be_build() {
  docker-compose -f $docker_compose_be build
}

full_build() {
  auth_build
  be_build
  frontend_build
  chat_build
}

main() {
  $1_$2
}

main "$@"
