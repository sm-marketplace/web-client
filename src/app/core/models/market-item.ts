// uint256 id;
// address payable seller;
// address payable owner;
// uint256 price;
// bool sold;
export class MarketItem {

  // props
  id
  seller
  owner
  price
  sold

  constructor(value: any[]) {
    this.id = value[0];
    this.seller = value[1];
    this.owner = value[2];
    this.price = value[3];
    this.sold = value[4];
  }
}