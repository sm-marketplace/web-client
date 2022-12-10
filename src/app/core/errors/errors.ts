import { MetamaskNotInstalledError } from "./metamask-not-installed.error";
import { UnsuportedNetworkError } from "./unsuported-network.error";

export const UNSUPORTED_NETWORK = new UnsuportedNetworkError("Unsuported network.");
export const METAMASK_NOT_INSTALLED = new MetamaskNotInstalledError("Should be have Metamask extension installed.");