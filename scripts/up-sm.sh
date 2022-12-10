#!/bin/bash

CONTAINER_NAME=smmp-smart-contract
PORT=8545
IMAGE=rogrp6/smmp-smart-contract

# Run local network in container (port 8545)
docker run --pull allways --rm -d \
--name $CONTAINER_NAME -p $PORT:8545 \
$IMAGE

# Deploy contract on container network 
docker exec -it $CONTAINER_NAME /bin/sh -c "\
cd /usr/src/app; \
npx hardhat run scripts/deploy.js --network localhost"

# Generate __contract.js
export CONTRACT_ARTIFACT_STR=$(\
  docker exec -it $CONTAINER_NAME /bin/sh -c "node get-artifact.js")
  
envsubst < ./ci/templates/__contract.js > ./src/__contract.js