import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionRequiredGuard } from './guards/session-required.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'home',
    canActivate: [SessionRequiredGuard],
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
