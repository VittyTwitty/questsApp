import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./footer/footer";
import { HeaderComponent } from "./header/header";

@NgModule({

    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ],
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    providers: [],
})
export class SharedModule { }