import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, from, tap } from "rxjs";
import { contractArtifact, environment } from "src/environments/environment";
import Web3 from "web3";
import { WalletService } from "./wallet.service";

@Injectable({
  providedIn: "root"
})
export class ContractService {

  constructor(private walletService: WalletService) { }

  get contract() {
    /**
     * <<<< if metamask isnt connected >>>>
     * const provider = environment.PROVIDER_URL; 
     **/
    const provider = this.walletService.provider; 
    const web3 = new Web3(provider);
    const address = contractArtifact.address;
    const abi: any = contractArtifact.json.abi;
    const contract = new web3.eth.Contract(abi, address);

    return contract;
  }

  /**---------------------------
   * @GETTERS
   * ---------------------------*/

  mpGetTxCommission() {
    const promise = this.contract.methods._ownerGetTxCommission().call();
    return from(promise);
  }
  
  mpGetNumberOfAssets() {
    const promise = this.contract.methods._mpGetNumberOfAssets().call();
    return from(promise);
  }

  mpGetAllItemsToSell() {
    const promise = this.contract.methods._mpGetAllItemsToSell().call();
    return from(promise);
  }

  mpGetMyOwnAssets() {
    const promise = this.contract.methods._mpGetMyOwnAssets().call();
    return from(promise);
  }

  mpGetMyAssetsToSell() {
    const promise = this.contract.methods._mpGetMyAssetsToSell().call();
    return from(promise);
  }

  mpGetAsset(id: number) {
    const promise = this.contract.methods._mpGetAsset(id).call();
    return from(promise);
  }

  /**---------------------------
   * @SETTERS
   * ---------------------------*/

  mpNewAsset(value: string, payload: {
    tokenURI: string, 
    wei: string
  }) {
    const { tokenURI, wei } = payload;
    const _from = this.walletService.getAccoundAddress();

    const promise = this.contract.methods._mpNewAsset(tokenURI, wei)
    .send( { from: _from, value } );

    return from(promise);
  }
  
}