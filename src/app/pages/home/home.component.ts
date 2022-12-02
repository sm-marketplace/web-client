import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { MarketplaceService } from 'src/app/services/marketplace.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  commission$ = this.mpService.commission$;
  itemsToSell$ = this.mpService.itemsToSell$.pipe(
    map(items => items && items.reverse())
  );

  constructor(private mpService: MarketplaceService) {
  }

  ngOnInit(): void {
  }

}
