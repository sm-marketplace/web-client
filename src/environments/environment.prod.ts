import { IContractArtifact, IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
  ENV: 'PROD',
  CHAINS_ID: [/*'0x1',*/ '0x13881', '0x5', '0x539'],
  PROVIDER_URL: "https://rpc.ankr.com/eth_goerli",
};

export const contractArtifact: IContractArtifact = (<any>window).__contract;