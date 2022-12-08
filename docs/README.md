



## Contribuir

### Requirements
- Docker
- Cuenta en [Pinata](https://www.pinata.cloud/)

### **Ejecución**

### 1 - Smart contract

```sh
docker pull rogrp6/smmp-web3net
docker stop smmp-web3net # cleanup, ignore if error
docker rm smmp-web3net # cleanup, ignore if error
docker run --name smmp-web3net -p 8545:8545 -d smmp-web3net
docker logs smmp-web3net > accounts.txt # accounts created for the network
docker exec -it smmp-web3net /bin/sh -c \
  "cd /usr/src/app; \
  npx hardhat run scripts/deploy.js --network localhost" \
  > contract-address.txt # smart contract address
```

### 2 - API

Needs PINATA_API_KEY y PINATA_SECRET_API_KEY you must obtain them by creating a project in 
[Pinata](https://www.pinata.cloud/) and replace the values in `<PINATA_API_KEY>` y
`<PINATA_SECRET_API_KEY>`

```sh
docker pull rogrp6/smmp-api:dev
docker stop smmp-api # cleanup, ignore if error
docker rm smmp-api # cleanup, ignore if error
docker run --name smmp-api -d -p 3000:3000 \
  -e PORT=3000 \
  -e HOST=0.0.0.0 \
  -e STAGE=dev \
  -e PINATA_API_KEY=<PINATA_API_KEY> \
  -e PINATA_SECRET_API_KEY=<PINATA_SECRET_API_KEY> \
  rogrp6/smmp-api:dev
```

### 3 - Web Client

3.1- Clone
```bash
git clone https://github.com/sm-marketplace/web-client.git
cd web-client
```

3.2- Config environment
```bash
// src/environments/environment.ts
  ...
  API: 'http://127.0.0.1:3000',
  ...
```

3.3- Run
```
ng serve -o
```