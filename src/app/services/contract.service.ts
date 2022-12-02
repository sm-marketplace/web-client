import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, from, Observable, tap } from "rxjs";
import { contractArtifact, environment } from "src/environments/environment";
import Web3 from "web3";
import { LOG } from "../utils/log.utils";
import { WalletService } from "./wallet.service";

/**
 * // TODO: decorador con parametro de mensaje
 * para el log de la funcion:
 * ```
 * pipe(
 *    tap(res => res && LOG.msg("Get TxCommission", "success")),
 *  );
 * ```
 */
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
    return from(promise).pipe(
      tap(res => res && LOG.msg("Get TxCommission", "success")),
    );
  }
  
  mpGetNumberOfAssets() {
    const promise = this.contract.methods._mpGetNumberOfAssets().call();
    return from(promise).pipe(
      tap(res => res && LOG.msg("Get NumberOfAssets", "success")),
    );
  }

  mpGetAllItemsToSell() {
    const promise = this.contract.methods._mpGetAllItemsToSell().call();
    return (from(promise) as Observable<any[]>).pipe(
      tap(res => res && LOG.msg("Get AllItemsToSell", "success")),
    );;
  }

  mpGetMyOwnAssets() {
    const promise = this.contract.methods._mpGetMyOwnAssets().call();
    return from(promise).pipe(
      tap(res => res && LOG.msg("Get GetMyOwnAssets", "success")),
    );
  }

  mpGetMyAssetsToSell() {
    const promise = this.contract.methods._mpGetMyAssetsToSell().call();
    return from(promise).pipe(
      tap(res => res && LOG.msg("Get GetMyAssetsToSell", "success")),
    );
  }

  mpGetAsset(id: number) {
    const promise = this.contract.methods._mpGetAsset(id).call();
    return from(promise).pipe(
      tap(res => res && LOG.msg("Get GetAsset", "success")),
    );
  }

  getTokenURI(id: number) {
    const promise = this.contract.methods.tokenURI(id).call();
    return from(promise).pipe(
      tap(res => res && LOG.msg("Get TokenURI", "success")),
    );
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

    return from(promise).pipe(
      tap(res => res && LOG.msg("New Asset", "success")),
    );
  }
  
}