# SM Marketplace - WebClient

## Requerimientos
- Node 16
- Cuenta en [Pinata](https://www.pinata.cloud/)

## Docker (in progress)
**Require:** contract-artifact.json 

For get the contact-artifact.json run:

```bash
docker run --pull always --rm \
--entrypoint node \
rogrp6/smmp-smart-contract:latest \
get-artifact.js > contract-artifact.json
```

This generates contact-artifact.json in your current directory, then
you should pass the content as environment variable (CONTRACT_ARTIFACT_STR).
Needs replace all double quotes characters with simple quote (in bash can 
use: `sed s/\"/\'/g contract-artifact.json`)

// 80 es el puerto del nginx
```bash
sudo docker run --pull always --rm --name smmp-web-client -d -p 4200:80 \
-e CONTRACT_ARTIFACT_STR="$(sed s/\"/\'/g contract-artifact.json)" \
-e ENV=DEV \
-e PROVIDER=https://rpc.ankr.com/eth_goerli \
-e API=http://ec2-34-238-181-64.compute-1.amazonaws.com \
-e IPFS_FILES_URL=https://ipfs.io/ipfs \
rogrp6/smmp-web-client:dev
```

## Development
### 1 - Smart contract

```bash
(bash)
docker pull rogrp6/smmp-smart-contract
docker stop smmp-smart-contract # limpieza, ignore si da error
docker rm smmp-smart-contract # limpieza, ignore si da error
docker run --name smmp-smart-contract -p 8545:8545 -d rogrp6/smmp-smart-contract
docker logs smmp-smart-contract > accounts.txt # cuentas creadas para la red
docker exec -it smmp-smart-contract /bin/sh -c "\
  cd /usr/src/app; \
  npx hardhat run scripts/deploy.js --network localhost"
export CONTRACT_ARTIFACT_STR=$(\
  docker exec -it smmp-smart-contract /bin/sh -c "node get-artifact.js")
envsubst < ./ci/templates/__contract.js > ./src/__contract.js # set artifact
```

```batch
(windows batch)
docker pull rogrp6/smmp-smart-contract
docker stop smmp-smart-contract # limpieza, ignore si da error
docker rm smmp-smart-contract # limpieza, ignore si da error
docker run --name smmp-smart-contract -p 8545:8545 -d rogrp6/smmp-smart-contract
docker logs smmp-smart-contract > accounts.txt # cuentas creadas para la red
docker exec -it smmp-smart-contract /bin/sh -c "^
  cd /usr/src/app; ^
  npx hardhat run scripts/deploy.js --network localhost"
docker exec -it smmp-smart-contract /bin/sh -c "node get-artifact.js" > contract-artifact.json
node __contract.make.js > src\__contract.js
```

### 2 - API

Necesita obtener PINATA_API_KEY y PINATA_SECRET_API_KEY creando un proyecto en 
[Pinata](https://www.pinata.cloud/) y reemplazar los valores en `<PINATA_API_KEY>` y
`<PINATA_SECRET_API_KEY>`

```sh
docker pull rogrp6/smmp-api:dev
docker stop smmp-api # limpieza, ignore si da error
docker rm smmp-api # limpieza, ignore si da error
docker run --name smmp-api -d -p 3000:3000 \
  -e PORT=3000 \
  -e HOST=0.0.0.0 \
  -e STAGE=dev \
  -e PINATA_API_KEY=$PINATA_API_KEY \
  -e PINATA_SECRET_API_KEY=$PINATA_SECRET_API_KEY \
  rogrp6/smmp-api:dev
```

```batch
docker pull rogrp6/smmp-api:dev
docker stop smmp-api # limpieza, ignore si da error
docker rm smmp-api # limpieza, ignore si da error
docker run --name smmp-api -d -p 3000:3000 ^
  -e PORT=3000 ^
  -e HOST=0.0.0.0 ^
  -e STAGE=dev ^
  -e PINATA_API_KEY=%PINATA_API_KEY% ^
  -e PINATA_SECRET_API_KEY=%PINATA_SECRET_API_KEY% ^
  rogrp6/smmp-api:dev
```

### 3 - Web Client

3.1- Clonar
```bash
git clone https://github.com/sm-marketplace/web-client.git
cd web-client
```

3.2- Configurar environment
```bash
// src/environments/environment.ts
  ...
  API: 'http://127.0.0.1:3000',
  ...
```

3.3- Correr
```
ng serve -o
```