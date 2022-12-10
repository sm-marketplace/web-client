import { IContractArtifact, IEnvironment } from "./environment.interface";

export const environment: IEnvironment = (<any>window).__env;

export const contractArtifact: IContractArtifact = (<any>window).__contract;