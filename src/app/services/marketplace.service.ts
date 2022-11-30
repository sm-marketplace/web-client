import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, switchMap, tap } from "rxjs";
import { ContractService } from "./contract.service";

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  commission = new BehaviorSubject<string | undefined>(undefined); 
  commission$ = this.commission.asObservable();

  itemsToSell = new BehaviorSubject<any[] | undefined>(undefined); 
  itemsToSell$ = this.itemsToSell.asObservable();

  constructor(private contract: ContractService) {
    this.fetch().subscribe();
  }

  createAsset(tokenURI: string, wei: string) {
    const commission = this.getCommission() as string;

    return this.contract.mpNewAsset(
      commission, {tokenURI, wei}
    ).pipe(
      switchMap(_ => this.fetchItemsToSell()),
    );
  }

  fetch() {
    return forkJoin({
      c: this.fetchCommission(),
      i: this.fetchItemsToSell(),
    })
  }

  getCommission() {
    return this.commission.getValue();
  }

  fetchCommission() {
    return this.contract.mpGetTxCommission().pipe(
        tap(value => this.commission.next(<string>value)),
      );
  }

  getItemsToSell() {
    return this.itemsToSell.getValue();
  }

  fetchItemsToSell() {
    return this.contract.mpGetAllItemsToSell().pipe(
      tap(items => this.itemsToSell.next(<any[]>items))
    );
  }

}