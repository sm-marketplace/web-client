import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IpfsURIPipe } from 'src/app/core/pipes/ipfs-uri.pipe';

@Component({
  selector: 'app-market-item',
  templateUrl: './market-item.component.html',
  styleUrls: ['./market-item.component.scss'],
  providers: [IpfsURIPipe]
})
export class MarketItemComponent implements OnInit {

  @Input() set item(val: any) {
    this._item = val;
    this.elem.nativeElement.style.setProperty(
      '--img-url', `url(${this.ipfsURI.transform(val.uri)})`);
  }

  _item: any;

  constructor(
    private elem: ElementRef,
    private ipfsURI: IpfsURIPipe) {
  }

  ngOnInit(): void {
  }

}
