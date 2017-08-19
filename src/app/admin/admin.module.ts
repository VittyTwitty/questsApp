import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { adminRoutes } from "./admin.routing";
import { SharedModule } from "../shared/shared.module";
import { ChartsModule } from "ng2-charts";
import { NgbdModalBasic } from "./admin-modal/admin-modal";
import { NgbModalStack } from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import { AdminStatisticComponent } from "./admin-statistic/admin-statistic.component";
import { CreateTestsComponent } from "./create-tests/create-tests.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(adminRoutes),
        SharedModule,
        ChartsModule,
        
    ],
    exports: [
        NgbdModalBasic,
        CreateTestsComponent
    ],
    declarations: [
        AdminComponent,
        NgbdModalBasic,
        AdminStatisticComponent,
        CreateTestsComponent
    ],
    providers: [
        NgbdModalBasic,
        NgbModalStack
    ],
})
export class AdminModule { }
