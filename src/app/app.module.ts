import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PrimengModule } from './primeng/primeng.module';
import { MessageService } from 'primeng/api';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { makeFactory } from './core/initializers/factory';
import { SessionRecoverInitializer } from './core/initializers/session-recover.init';
import { CreateComponent } from './pages/create/create.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoadingStatusFactory } from './core/services/loading.status.factory';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MyNftsComponent } from './pages/my-nfts/my-nfts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    CreateComponent,
    MainLayoutComponent,
    MyNftsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: makeFactory<SessionRecoverInitializer>(),
      deps: [SessionRecoverInitializer],
      multi: true
    },
    MessageService,
    LoadingStatusFactory,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
