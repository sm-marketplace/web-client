import { Pipe, PipeTransform } from '@angular/core';
import Web3 from 'web3';

@Pipe({
  name: 'weiToEth'
})
export class WeiToEthPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return Web3.utils.fromWei(value);
  }

}
