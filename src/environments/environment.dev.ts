import { IContractArtifact, IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
  ENV: 'DEV',
  CHAINS_ID: [/*'0x1',*/ '0x13881', '0x5', '0x539'],
  PROVIDER_URL: "https://rpc.ankr.com/eth_goerli",
  API: 'http://ec2-34-238-181-64.compute-1.amazonaws.com',
  IPFS_FILES_URL: 'https://ipfs.io/ipfs',
};

export const contractArtifact: IContractArtifact = (<any>window).__contract;