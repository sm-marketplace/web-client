import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'ipfsURI'
})
export class IpfsURIPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.replace('ipfs://', environment.IPFS_FILES_URL + '/');
  }

}
