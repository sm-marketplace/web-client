import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { IpfsURIPipe } from './pipes/ipfs-uri.pipe';
import { ImageLoaderDirective } from './directives/image-loader.directive';
import { WeiToEthPipe } from './pipes/wei-to-eth.pipe';



@NgModule({
  declarations: [
    LoaderComponent,
    IpfsURIPipe,
    ImageLoaderDirective,
    WeiToEthPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoaderComponent,
    IpfsURIPipe,
    ImageLoaderDirective,
    WeiToEthPipe,
  ]
})
export class CoreModule { }
