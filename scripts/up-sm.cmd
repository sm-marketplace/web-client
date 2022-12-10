@echo off

set CONTAINER_NAME=smmp-smart-contract
set PORT=8545
set IMAGE=rogrp6/smmp-smart-contract

@REM Run local network in container (port 8545)
docker run --pull allways --rm -d ^
--name %CONTAINER_NAME% -p %PORT%:8545 ^
%IMAGE%

@REM Deploy contract on container network 
docker exec -it %CONTAINER_NAME% /bin/sh -c "^
cd /usr/src/app; ^
npx hardhat run scripts/deploy.js --network localhost"

@REM Generate contract-artifact.json file
docker exec -it %CONTAINER_NAME% /bin/sh -c "node get-artifact.js" > contract-artifact.json

@REM Use contract-artifact.json for generate __contract.js
node __contract.make.js > src\__contract.js