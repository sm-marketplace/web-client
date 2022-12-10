import { Injectable } from "@angular/core";
import { BehaviorSubject, map, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { UNSUPORTED_NETWORK } from "../core/errors/errors";
import { LOG } from "../utils/log.utils";
import { Web3Utils } from "../utils/web3.utils";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private isConnected = new BehaviorSubject<any>(undefined);
  private accountAddress = new BehaviorSubject<any>(undefined);
  
  isConnected$ = this.isConnected.asObservable();
  accountAddress$ = this.accountAddress.asObservable();

  provider: any = null;

  constructor() { }

  getIsConnected() {
    return this.isConnected.getValue();
  }

  getAccoundAddress() {
    return this.accountAddress.getValue();
  }

  connect() {
    return Web3Utils.connectToApp().pipe(
      tap( ({provider, chainId, accountAddress})  => {

        if (!environment.CHAINS_ID.includes(chainId)) {
          throw UNSUPORTED_NETWORK;
        }

        this.provider = provider,
        this.accountAddress.next(accountAddress[0]);
        this.isConnected.next(true);
      } ),
    )
  }
}