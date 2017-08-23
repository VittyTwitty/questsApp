import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { loginRoutes } from './login-page.routing';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RegistrationComponent } from './registratrion/registration.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes),
  ],
  exports: [
    LoginPageComponent,
    LoginComponent,
    RegistrationComponent,
    ForgetPasswordComponent
  ],
  declarations: [
    LoginPageComponent,
    LoginComponent,
    RegistrationComponent,
    ForgetPasswordComponent
  ],
  providers: [],
})
export class LoginPageModule {
}
