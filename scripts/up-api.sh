#!/bin/bash

CONTAINER_NAME=smmp-api
PORT=3000
IMAGE=rogrp6/smmp-api:dev

docker run --pull allways --rm -d \
--name $CONTAINER_NAME -p $PORT:8545 \
-e PORT=$PORT \
-e HOST=0.0.0.0 \
-e STAGE=dev \
-e PINATA_API_KEY=$PINATA_API_KEY \
-e PINATA_SECRET_API_KEY=$PINATA_SECRET_API_KEY \
$IMAGE
