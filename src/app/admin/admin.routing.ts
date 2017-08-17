import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "./admin.component";
import { TrueAnswersResolver } from "../shared/services/true-anwsers.resolver";
import { RoleGuard } from "../core/role-guard.service";


export const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [RoleGuard],
        // data: { roles: ['super-admin', 'admin'] }
        // resolve: {
        //     users: TrueAnswersResolver
        // }
    }
]