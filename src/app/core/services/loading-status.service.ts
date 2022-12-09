import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingStatusService {

  private loading = new BehaviorSubject<boolean>(false);
  private activeCalls = 0;

  loading$ = this.loading.asObservable();

  constructor() {}

  handleLoagind() {
    this.loading.next(this.activeCalls !== 0);
  }

  startCall() {
    this.activeCalls++;
    this.handleLoagind();
  }
  
  endCall() {
    this.activeCalls--;
    this.handleLoagind();
  }
  
}