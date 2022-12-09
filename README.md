# SM Marketplace - WebClient

## Requirements
- Node 16
- Cuenta en [Pinata](https://www.pinata.cloud/)

## Docker
**Require:** contract-artifact.json 

First should run:

```bash
docker run --pull always --rm \
--entrypoint node \
rogrp6/smmp-smart-contract:latest \
get-artifact.js > contract-artifact.json
```

This generates contact-artifact.json in your current directory, then
you should pass the content as environment variable (`CONTRACT_ARTIFACT_STR`).
Needs replace all double quotes characters with simple quote (in bash can 
use: `sed s/\"/\'/g contract-artifact.json`)

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

Follow the steps below to run the project in your local environment.
For Windows use scripts with extension `.cmd` y `.sh` for linux based systems.

1 - Smart contract

`./scripts/up-sm.sh`


2 - API

Needs generate **`PINATA_API_KEY`** and **`PINATA_SECRET_API_KEY`** creating a 
[Pinata](https://www.pinata.cloud/) project and then should set as enviroment variables

`./scripts/up-api.sh`


3 - Web Client

3.1- Configurar environment
```bash
// src/environments/environment.ts
  ...
  API: 'http://127.0.0.1:3000',
  ...
```

3.2- Serve
```
ng serve -o
```