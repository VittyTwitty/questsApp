import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { adminRoutes } from "./admin.routing";
import { SharedModule } from "../shared/shared.module";
import { ChartsModule } from "ng2-charts";
// import { NgbdModalBasic } from "./admin-modal/admin-modal";

import { AdminStatisticComponent } from "./admin-statistic/admin-statistic.component";
import { CreateTestsComponent } from "./create-tests/create-tests.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
    MdDialogModule,
    
} from '@angular/material';
import { DialogOverviewExampleDialog, DialogOverviewExample } from "./admin-modal/admin-modal";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(adminRoutes),
        SharedModule,
        ChartsModule,
        BrowserAnimationsModule,
        MdDialogModule,
        ReactiveFormsModule

    ],
    exports: [
        CreateTestsComponent,
        MdDialogModule
       
    ],
    entryComponents: [DialogOverviewExample, DialogOverviewExampleDialog],
    declarations: [
        AdminComponent,
        AdminStatisticComponent,
        CreateTestsComponent,
        DialogOverviewExampleDialog,
        DialogOverviewExample,
    ],
    providers: [
    ],
})
export class AdminModule { }
