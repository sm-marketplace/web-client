import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Web3AuthService } from '../services/web3-auth.service';
import { LOG } from '../utils/log.utils';

@Injectable({
  providedIn: 'root'
})
export class SessionRequiredGuard implements CanActivate {

  constructor(
    private sessionService: Web3AuthService, 
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    return this.sessionService.loggedIn$.pipe(
      map(e => {
        if (e) return true;
        LOG.msg(`Guard[SessionRequired] | Block Access To ${route}`, 'info')
        this.router.navigate(['/', 'auth']);
        return false;
      }),
      catchError((err) => {
        LOG.msg(`Guard[SessionRequired] | Block Access To ${route}`, 'info')
        this.router.navigate(['/', 'auth']);
        return of(false);
      })
    );

  }
  
}


// import {Observable} from 'rxjs';

// import {AuthService} from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private auth: AuthService, private router: Router) {
//   }

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     if (!this.auth.isLogin()) {
//       return this.router.navigate(['/login']).then(() => false);
//     }
//     return true;
//   }
// }