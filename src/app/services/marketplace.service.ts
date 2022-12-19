import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, map, of, switchMap, tap } from "rxjs";
import { useLoading } from "../core/decorators/catch-loading.decorator";
import { IPinataMetadata } from "../core/interfaces/pinata-metadata.interface";
import { RpcContractService } from "./external/rpc-contract.service";
import { HttpPinataService } from "./external/http-pinata.service";
import { MarketItem } from "../core/models/market-item";

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  commission = new BehaviorSubject<string | undefined>(undefined); 
  commission$ = this.commission.asObservable();

  itemsToSell = new BehaviorSubject<any[] | undefined>(undefined); 
  itemsToSell$ = this.itemsToSell.asObservable();

  myItems = new BehaviorSubject<any[] | undefined>(undefined); 
  myItems$ = this.myItems.asObservable();

  itemsDict: any = {};

  constructor(
    private contract: RpcContractService,
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

  @useLoading()
  buyItem(id: string) {
    const item = this.itemsDict[id];
    const amount = item['price'];

    return this.contract.mpBuyAsset(amount, { id }).pipe(
      switchMap(_ => this.fetchItemsToSell()),
    )
  }

  @useLoading()
  fetch() {
    return forkJoin({
      c: this.fetchCommission(),
      i: this.fetchItemsToSell(),
    })
  }

  @useLoading()
  fetchCommission() {
    return this.contract.mpGetTxCommission().pipe(
        tap(value => this.commission.next(<string>value)),
      );
  }

  @useLoading()
  fetchMyItems() {
    return this.contract.mpGetMyAssetsToSell().pipe(
      tap(items => console.log({items})),
      map(ctrcItems => ctrcItems.map(item => new MarketItem(item))),
      switchMap(
        ctrcItems => forkJoin(
          ctrcItems.map( item => this._loadMarketitem(item) )
        ),
      ),
      tap(items => this.myItems.next(<any[]>items)),
    )
  }

  @useLoading()
  fetchItemsToSell() {
    return this.contract.mpGetAllItemsToSell().pipe(

      map(ctrcItems => ctrcItems.map(item => new MarketItem(item))),

      switchMap(
        ctrcItems => forkJoin(
          ctrcItems.map( item => this._loadMarketitem(item) )
        ),
      ),
      
      tap(items => this.itemsDict = this._getItemsDict(items)),
      tap(items => this.itemsToSell.next(<any[]>items)),
    );
  }

  /**
   * @returns Cache of items to sell
   */
  getItemsToSell() {
    return this.itemsToSell.getValue();
  }

  /**
   * @returns Cache of commission
   */
  getCommission() {
    return this.commission.getValue();
  }

  // Utils
  _loadMarketitem(ctrcItem: any) {

    let item = ctrcItem;

    return of(item).pipe(
      // Load URI
      switchMap(item => this.contract.getTokenURI(item.id)),
      
      // Set props
      tap(uri => item = ({
        ...item,
        uri, 
        hash: (<string>uri).replace('ipfs://', ''),
      })),

      // Load Metadata
      switchMap(_ => this.httpPinataService.getFile(item.hash)),
      
      // Set props
      map((res: any) => res?.item?.metadata),
      map((metadata: any) => item = ({
        ...item, 
        metadata: {
          filename: metadata?.name,
          ...metadata?.keyvalues
        }, 
      }))
    )

  }

  // Utils
  _getItemsDict(items: MarketItem[], key: keyof MarketItem = 'id') {
    const dict: any = {};

    items.forEach(item => {
      dict[item[key]] = item
    })


    return dict;
  }
}