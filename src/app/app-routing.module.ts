import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionRequiredGuard } from './core/guards/connection-required.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthComponent } from './pages/auth/auth.component';
import { CreateComponent } from './pages/create/create.component';
import { HomeComponent } from './pages/home/home.component';
import { MyNftsComponent } from './pages/my-nfts/my-nfts.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        canActivate: [ConnectionRequiredGuard],
        component: HomeComponent,
      },
      {
        path: 'create',
        canActivate: [ConnectionRequiredGuard],
        component: CreateComponent,
      },
      {
        path: 'my-nfts',
        canActivate: [ConnectionRequiredGuard],
        component: MyNftsComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
