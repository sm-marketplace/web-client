# SM Marketplace - WebClient

## Requerimientos
- Node 16
- Cuenta en [Pinata](https://www.pinata.cloud/)

## Docker
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

Siga los siguientes pasos para ejecutar el proyecto en su entorno local.
Para Windows use los script con extension `.cmd` y `.sh` para sistemas linux

1 - Smart contract

`./scripts/up-sm.sh`


2 - API

Necesita obtener `**PINATA_API_KEY**` y `**PINATA_SECRET_API_KEY**` creando un proyecto en 
[Pinata](https://www.pinata.cloud/) y setearlo como variables de entorno

`./scripts/up-api.sh`


### 3 - Web Client

1- Configurar environment
```bash
// src/environments/environment.ts
  ...
  API: 'http://127.0.0.1:3000',
  ...
```

2- Serve
```
ng serve -o
```