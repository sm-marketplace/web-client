import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import Web3 from 'web3';
import { environment } from 'src/environments/environment';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3AuthService {

  web3: any = null;
  
  private chainIds: string[] = environment.CHAINS_ID;
  private loggedIn = new BehaviorSubject<boolean>(false);
  
  addressUser = new BehaviorSubject<string>('');
  loggedIn$ = this.loggedIn.asObservable();
  
  get web3Instance() { return this.web3; }

  constructor(private toastr: ToastrService) {

    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
    } else {
      this.toastr.error("Debes tener instalado Metamask", "Metamask no encontrado");
    }
  }

  connect() {
    this.handleIdChainChanged();
  }

  async handleIdChainChanged() {
    const chainId: string = await window.ethereum.request({ method: 'eth_chainId' });

    console.log("chainId", chainId);

    if (this.chainIds.includes(chainId)) {
      this.handleAccountsChanged();
    } else {
      this.toastr.error("Debes usar la red de Mumbai", "Red incorrecta");
    }

    window.ethereum.on('chainChanged', (res: string) => {
      if (!this.chainIds.includes(res)) {
        this.logout();
        this.toastr.error("Debes usar la red de Mumbai", "Red incorrecta");
      } else {
        if (this.addressUser.getValue() === '') {
          this.handleAccountsChanged();
        } else {
          this.authBackend();
        }
      }
    });
  }

  async handleAccountsChanged() {
    const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });

    this.addressUser.next(accounts[0]);
    this.authBackend();

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      this.addressUser.next(accounts[0]);
      this.authBackend();
    });
  }

  async authBackend() {
    // => IF Success auth api backend
    this.loggedIn.next(true);

    // => IF Failed auth api backend d
    //this.logout();
  }

  logout() {
    this.loggedIn.next(false);
  }
}