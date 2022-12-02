import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, map, switchMap, tap } from "rxjs";
import { Loading } from "../core/decorators/catch-loading.decorator";
import { IPinataMetadata } from "../core/interfaces/pinata-metadata.interface";
import { ContractService } from "./contract.service";
import { HttpPinataService } from "./http-pinata.service";

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  commission = new BehaviorSubject<string | undefined>(undefined); 
  commission$ = this.commission.asObservable();

  itemsToSell = new BehaviorSubject<any[] | undefined>(undefined); 
  itemsToSell$ = this.itemsToSell.asObservable();

  constructor(
    private contract: ContractService,
    private httpPinataService: HttpPinataService) {
    
    this.fetch().subscribe();
  }

  @Loading()
  createItem(file: File, metadata: IPinataMetadata, wei: string) {
    const commission = this.getCommission() as string;

    return this.httpPinataService.uploadFile(file, metadata).pipe(
      map(res => res.pinata.IpfsHash),
      map(hash => `ipfs://${hash}`),
      switchMap(uri => this.contract.mpNewAsset(
        commission, {tokenURI: uri, wei}
      )),
      switchMap(_ => this.fetchItemsToSell()),
    )
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