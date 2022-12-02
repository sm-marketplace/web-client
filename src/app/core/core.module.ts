import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { IpfsURIPipe } from './pipes/ipfs-uri.pipe';
import { ImageLoaderDirective } from './directives/image-loader.directive';



@NgModule({
  declarations: [
    LoaderComponent,
    IpfsURIPipe,
    ImageLoaderDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoaderComponent,
    IpfsURIPipe,
    ImageLoaderDirective,
  ]
})
export class CoreModule { }
