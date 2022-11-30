import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
// import { Web3AuthService } from 'src/app/services/web3-auth.service';
import { environment } from 'src/environments/environment';
import Web3 from 'web3';
import { MetaMaskInpageProvider } from "@metamask/providers";

// import contractFile from "../../../_contract.js";
import SMMarketplace from '../../../artifacts/contracts/SMMarketplace.sol/SMMarketplace.json';
import { ContractService } from 'src/app/services/contract.service';
import { tap } from 'rxjs';
import { MarketplaceService } from 'src/app/services/marketplace.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  commission$ = this.mpService.commission$;
  itemsToSell$ = this.mpService.itemsToSell$;

  constructor(private mpService: MarketplaceService) {

    // this.contractService.newAsset("sm1", "25000000000000000").pipe(
    //   tap(res => console.log({res}))
    // ).subscribe()

  }

  ngOnInit(): void {
  }

}
