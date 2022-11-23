import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    CardModule,
    ToastModule,
  ],
  imports: [
    CommonModule,
  ]
})
export class PrimengModule { }
