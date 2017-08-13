import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { homeRoutes } from "./home.routing";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(homeRoutes),
        SharedModule
    ],
    exports: [
        HomeComponent,
    ],
    declarations: [
        HomeComponent,
    ],
    providers: [

    ],
})
export class HomePageModule { }