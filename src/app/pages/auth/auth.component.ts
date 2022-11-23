import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Web3AuthService } from 'src/app/services/web3-auth.service';
import { tap, filter, takeUntil } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  constructor(
    public authService: Web3AuthService,
    private toastr: ToastrService,
    private route: Router,
    ) {

      this.authService.loggedIn$.pipe(
        takeUntil(this.destroy$),
        filter(logged => !!logged),
        tap(
          _ => this.route.navigate(['home'])
        )
      ).subscribe();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  handleConnect() {
    this.authService.connect();
  }
}
