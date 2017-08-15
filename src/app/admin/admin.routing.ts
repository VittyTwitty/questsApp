import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "./admin.component";
import { TrueAnswersResolver } from "../shared/services/true-anwsers.resolver";


export const adminRoutes: Routes = [
    {
        path: 'admin', component: AdminComponent,
        // resolve: {
        //     users: TrueAnswersResolver
        // }
    }
]