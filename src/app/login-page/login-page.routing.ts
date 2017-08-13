import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './login-page.component';
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registratrion/registration.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";

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
]