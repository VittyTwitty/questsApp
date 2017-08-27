import { Routes } from '@angular/router';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionsResultComponent } from './questions-result/questions-result.component';
import { AuthGuard } from '../core/auth-guard.service';
import { QuestionGuard } from '../shared/question-guard';

export const questionsRoutes: Routes = [
    {
        path: 'question/:id',
        component: QuestionsListComponent,
        canActivate: [QuestionGuard],
    },
    {
        path: 'result',
        component: QuestionsResultComponent,
        canActivate: [AuthGuard],
    },
];
