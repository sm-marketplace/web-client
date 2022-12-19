import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from 'src/app/services/marketplace.service';

@Component({
  selector: 'app-my-nfts',
  templateUrl: './my-nfts.component.html',
  styleUrls: ['./my-nfts.component.scss']
})
export class MyNftsComponent implements OnInit {

  items$ = this.mpService.myItems$;

  constructor(private mpService: MarketplaceService) {
    this.mpService.fetchMyItems().subscribe()
  }

  ngOnInit(): void {
  }

}
