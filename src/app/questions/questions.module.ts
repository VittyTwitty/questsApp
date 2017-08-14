import { NgModule } from '@angular/core';
import { QuestionsItemComponent } from "./questions-item/questions-item.component";
import { QuestionsListComponent } from "./questions-list/questions-list.component";
import { QuestionsResultComponent } from "./questions-result/questions-result.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { questionsRoutes } from "./questions.routing";
import { ChartsModule } from "ng2-charts";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(questionsRoutes),
        ChartsModule,
        SharedModule
    ],
    exports: [
        QuestionsListComponent,
        QuestionsItemComponent,
        QuestionsResultComponent
    ],
    declarations: [
        QuestionsListComponent,
        QuestionsItemComponent,
        QuestionsResultComponent
    ],
    providers: [],
})
export class QuestionModule { }
