import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsListComponent } from "./questions-list/questions-list.component";
import { QuestionsResultComponent } from "./questions-result/questions-result.component";


export const questionsRoutes: Routes = [
    { path: 'question', component: QuestionsListComponent },
    { path: 'result', component: QuestionsResultComponent },

]