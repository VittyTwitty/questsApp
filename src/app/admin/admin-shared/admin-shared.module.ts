import { NgModule } from '@angular/core';


import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DialogOverviewExample, DialogOverviewExampleDialog, DialogEditButton, AdminEditModalBody } from "./admin-modal/admin-modal";
import { ReactiveFormsModule } from "@angular/forms";
import { CreateTestModalComponent } from "../create-tests/create-test-modal/create-test-modal.component";

@NgModule({

    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        DialogOverviewExample,
        DialogOverviewExampleDialog,
        DialogEditButton,
        AdminEditModalBody
    ],
    entryComponents: [
        DialogOverviewExample,
        DialogOverviewExampleDialog,
        DialogEditButton,
        AdminEditModalBody,
        CreateTestModalComponent
    ],
    declarations: [
        DialogOverviewExampleDialog,
        DialogOverviewExample,
        DialogEditButton,
        AdminEditModalBody,
        CreateTestModalComponent
    ],
    providers: [

    ],
})
export class AdminSharedModule { }