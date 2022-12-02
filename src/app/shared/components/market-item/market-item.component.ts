import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-market-item',
  templateUrl: './market-item.component.html',
  styleUrls: ['./market-item.component.scss']
})
export class MarketItemComponent implements OnInit {

  @Input() item = {
    "id": "3",
    "seller": "0x93748157b9fd00280BF0276d3A68218D496994C1",
    "owner": "0x6D8BAFe9c01Bd2a0fD738E90bfaa5C1D33178082",
    "price": "2000000000000000000",
    "sold": false,
    "uri": "ipfs://QmW7L4Yaq5No6dQX2t57a1Wuo49LarV3bn3wYjnDaT67Lk",
    "hash": "QmW7L4Yaq5No6dQX2t57a1Wuo49LarV3bn3wYjnDaT67Lk",
    "metadata": {
      "filename": "tommy-oliver-1429885-normal.jpg",
      "name": "Ranger",
      "uploadedBy": "SMMP API",
      "description": "Ranger Tommy"
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
