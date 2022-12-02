// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IContractArtifact, IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
  ENV: 'DEV',
  CHAINS_ID: [/*'0x1',*/ '0x13881', '0x5', '0x539'],
  PROVIDER_URL: "https://rpc.ankr.com/eth_goerli",
  API: 'http://ec2-34-238-181-64.compute-1.amazonaws.com',
  IPFS_FILES_URL: 'https://ipfs.io/ipfs',
};

export const contractArtifact: IContractArtifact = (<any>window).__contract;

// PROVIDER_URL: "https://rpc-mumbai.maticvigil.com",

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
