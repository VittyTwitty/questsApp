import { Routes } from '@angular/router';

import { DataResolver } from './app.resolver';
import { HomeComponent } from "./home/home.component";
import { QuestionsListComponent } from "./questions-list/questions-list.component";

export const ROUTES: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'qustion', component: QuestionsListComponent },
];
