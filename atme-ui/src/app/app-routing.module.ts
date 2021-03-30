import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './login//signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
