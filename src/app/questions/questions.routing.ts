import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsListComponent } from "./questions-list/questions-list.component";
import { QuestionsResultComponent } from "./questions-result/questions-result.component";
import { AuthGuard } from "../core/auth-guard.service";


export const questionsRoutes: Routes = [
    {
        path: 'question',
        component: QuestionsListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'result',
        component: QuestionsResultComponent,
        canActivate: [AuthGuard],
    },

]