import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registratrion/registration.component';

export const loginRoutes: Routes = [
  {
    path: 'sign-in', component: LoginPageComponent,
    children: [
      {path: '', component: LoginComponent},
    ]
  },
  {
    path: 'sign-up', component: LoginPageComponent,
    children: [
      {path: '', component: RegistrationComponent},
    ]
  }
];
