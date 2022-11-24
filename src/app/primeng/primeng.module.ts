import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    CardModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    HttpClientModule,
  ],
  imports: [
    CommonModule,
  ]
})
export class PrimengModule { }
