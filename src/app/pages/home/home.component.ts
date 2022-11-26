import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
// import { Web3AuthService } from 'src/app/services/web3-auth.service';
import { environment } from 'src/environments/environment';
import Web3 from 'web3';
import { MetaMaskInpageProvider } from "@metamask/providers";

import contractFile from "../../contract-SMMarkletplace.json";
import SMMarketplace from '../../../artifacts/contracts/SMMarketplace.sol/SMMarketplace.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // itemNum = '1';

  constructor() {
  }

  // async createToken() {
  //   const provider = window.ethereum
  //   const web3 = new Web3(provider as any);
  //   const contract = new web3.eth.Contract(
  //     <any>SMMarketplace.abi,
  //     contractFile.address
  //   );

  //   const receipt = await contract.methods.newAsset(
  //     "sm123",
  //     "26000000000000000"
  //   ).send({ 
  //     from: this.sessionService.addressUser.getValue(),
  //     value: "25000000000000000"
  //   });
  // }

  // async getToken() {
  //   const provider = window.ethereum
  //   const web3 = new Web3(provider as any);
  //   const contract = new web3.eth.Contract(
  //     <any>contractFile.json.abi,
  //     contractFile.address
  //   );

  //   contract.methods.getAsset(parseInt(this.itemNum)).call(
  //     (err: any, res: any) => {
  //       console.log("Item 1", { err, res })
  //     }
  //   )
  // }

  // async connect() {

  //   if (window.ethereum) {
  //     await window.ethereum.request({ method: "eth_requestAccounts" });
  //     const web3 = new Web3(window.ethereum as any);
  //     const account = web3.eth.accounts;
  //     //Get the current MetaMask selected/active wallet
  //     const walletAddress = account.givenProvider.selectedAddress;
  //     console.log(`Wallet: ${walletAddress}`);
  //   } else {
  //     console.log("No wallet");
  //   }

  // }

  ngOnInit(): void {
  }

}
