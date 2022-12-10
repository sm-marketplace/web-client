import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, map, of, switchMap, tap } from "rxjs";
import { useLoading } from "../core/decorators/catch-loading.decorator";
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

  @useLoading()
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

  // TODO: Refactor
  @useLoading()
  fetchItemsToSell() {
    return this.contract.mpGetAllItemsToSell().pipe(

      map(items => items.map(item => this.parseItem(item))),
      
      switchMap(items => forkJoin({
        items: of(items),
        itemsURI: forkJoin(items.map(
          item => this.contract.getTokenURI(item.id)
        )),
      })),
      
      map(({items, itemsURI}) => items.map(
        (item, idx) => ({
          ...item, 
          uri: itemsURI[idx], 
          hash: (<string>itemsURI[idx]).replace('ipfs://', '')
        }),
      )),

      switchMap(items => forkJoin({
        items: of(items),
        itemsMetadata: forkJoin(items.map(
          item => this.httpPinataService.getFile(item.hash)
        )),
      })),

      map(({items, itemsMetadata}) => items.map(
        (item, idx) => {
          const metadata = (<any>itemsMetadata[idx])?.item?.metadata;
          return {
            ...item, 
            metadata: {
              filename: metadata?.name,
              ...metadata?.keyvalues
            }, 
          }
        },
      )),
      
      tap(items => this.itemsToSell.next(<any[]>items))
    );
  }

  parseItem(item: any[]) {
    // uint256 id;
    // address payable seller;
    // address payable owner;
    // uint256 price;
    // bool sold;
    return {
      id: item[0],
      seller: item[1],
      owner: item[2],
      price: item[3],
      sold: item[4],
    }
  }

}