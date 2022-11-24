import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorMsg } from 'src/app/core/messages/error.messages';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private walletService: WalletService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  handleConnect() {
    this.walletService.connect().pipe(
      catchError(
        (err) => { 
          this.toastr.error(
            ErrorMsg[err.constructor.name] ||
            ErrorMsg.DEFAULT
          );
          return of(undefined);
        }
      )
    ).subscribe(
      () => this.router.navigate(['home'])
    );
  }
}
