export interface IEnvironment {
  ENV: 'LOCAL' | 'DEV' | 'PROD',
  CHAINS_ID: string[],
  PROVIDER_URL: string,
  API: string,
  IPFS_FILES_URL: string,
}

export interface IContractArtifact {
  network: string,
  address: string,
  json: {
    contractName: string,
    abi: any[],
  }
}