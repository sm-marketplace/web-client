import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';

@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    CardModule,
    ToastModule,
    ToolbarModule
  ],
  imports: [
    CommonModule,
  ]
})
export class PrimengModule { }
