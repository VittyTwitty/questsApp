import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "./admin.component";
import { TrueAnswersResolver } from "../shared/services/true-anwsers.resolver";
import { RoleGuard } from "../core/role-guard.service";
import { CreateTestsComponent } from "./create-tests/create-tests.component";
import { AdminStatisticComponent } from "./admin-statistic/admin-statistic.component";


export const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [RoleGuard],
        children: [
            {path: 'create-tests', component: CreateTestsComponent},          
            {path: 'statistic', component: AdminStatisticComponent},          
        ]
        // data: { roles: ['super-admin', 'admin'] }
        // resolve: {
        //     users: TrueAnswersResolver
        // }
    },
    // {
    //     path: 'create-tests',
    //     component: CreateTestsComponent,
    // }
]