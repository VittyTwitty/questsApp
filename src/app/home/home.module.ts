import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { homeRoutes } from "./home.routing";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(homeRoutes)
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