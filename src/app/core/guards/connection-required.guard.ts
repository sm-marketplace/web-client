import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { WalletService } from '../../services/wallet.service';
import { LOG } from '../../utils/log.utils';

@Injectable({
  providedIn: 'root'
})
export class ConnectionRequiredGuard implements CanActivate {

  constructor(
    private wallet: WalletService, 
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    return this.wallet.isConnected$.pipe(
      map(e => {
        if (e) return true;
        LOG.msg(`Guard[ConnectionRequired] | Block Access To ${route}`, 'info')
        this.router.navigate(['/', 'auth']);
        return false;
      }),
      catchError((err) => {
        LOG.msg(`Guard[ConnectionRequired] | Block Access To ${route}`, 'info')
        this.router.navigate(['/', 'auth']);
        return of(false);
      })
    );
  }
  
}
