import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { adminRoutes } from "./admin.routing";
import { SharedModule } from "../shared/shared.module";
import { ChartsModule } from "ng2-charts";
import { NgbdModalBasic } from "./admin-modal/admin-modal";
import { NgbModalStack } from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(adminRoutes),
        SharedModule,
        ChartsModule
    ],
    exports: [NgbdModalBasic],
    entryComponents: [],
    declarations: [
        AdminComponent,
        NgbdModalBasic
    ],
    providers: [
        NgbdModalBasic,
        NgbModalStack
    ],
})
export class AdminModule { }
