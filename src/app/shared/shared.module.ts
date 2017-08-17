import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./footer/footer";
import { HeaderComponent } from "./header/header";
import { AuthService } from "../core/auth.service";
import { SpinnerComponent } from "./spinner/spinner.component";

@NgModule({

    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SpinnerComponent
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        SpinnerComponent
    ],
    providers: [
        AuthService,
    ],
})
export class SharedModule { }