import { Inject, Injectable } from "@angular/core";
import { map, Observable, of, tap, switchMap, catchError } from 'rxjs';
import { WalletService } from "src/app/services/wallet.service";
import { LOG } from "src/app/utils/log.utils";
import { Web3Utils } from "src/app/utils/web3.utils";
import { Initializer } from "./abstract-initializer";


@Injectable({
  providedIn: 'root'
})
export class SessionRecoverInitializer implements Initializer{

  constructor(
    private walletService: WalletService) { }

  init(): () => Observable<any> {
    return () => {
      return this.validateSession().pipe(
        tap( isValid => LOG.msg( 
          isValid? "Recovered Session" : "Does Not Exist A Valid Session", "info") 
        ),
        switchMap( isValid => {
          if (isValid) return this.walletService.connect();
          return of(false); 
        } ),
        catchError(
          (_) => of(false)
        )
      );
    }
  }

  validateSession() {
    return Web3Utils.consultAccount().pipe(
      map(accounts => accounts.length > 0),
      catchError((err) => {
        return of(false);
      })
    );
  }

}