import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { adminRoutes } from "./admin.routing";
import { SharedModule } from "../shared/shared.module";
import { ChartsModule } from "ng2-charts";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(adminRoutes),
        SharedModule,
        ChartsModule
    ],
    exports: [],
    declarations: [AdminComponent],
    providers: [],
})
export class AdminModule { }
