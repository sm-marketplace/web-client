import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketItemComponent } from './components/market-item/market-item.component';
import { CoreModule } from '../core/core.module';
import { PrimengModule } from '../primeng/primeng.module';
import { LogoComponent } from './components/logo/logo.component';



@NgModule({
  declarations: [
    MarketItemComponent,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    PrimengModule,
  ],
  exports: [
    MarketItemComponent,
    LogoComponent,
  ]
})
export class SharedModule { }
