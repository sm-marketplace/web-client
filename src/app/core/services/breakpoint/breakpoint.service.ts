import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Breakpoint, BreakpointSizes } from './breakpoint.model';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  breakpoint: BehaviorSubject<Breakpoint>;
  $size: Observable<Breakpoint>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpoint = new BehaviorSubject<Breakpoint>('xs');
    this.$size = this.breakpoint.asObservable();

    this.subscribeToBreakpointChanges();
  }

  subscribeToBreakpointChanges(): void {
    this.breakpointObserver
      .observe([BreakpointSizes.XS, BreakpointSizes.MD, BreakpointSizes.LG])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints[BreakpointSizes.XS]) {
          this.breakpoint.next('xs');
        }
        if (state.breakpoints[BreakpointSizes.MD]) {
          this.breakpoint.next('md');
        }
        if (state.breakpoints[BreakpointSizes.LG]) {
          this.breakpoint.next('lg');
        }
      });
  }
}