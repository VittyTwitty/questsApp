import { Injectable } from '@angular/core';
import { QuestionService } from '../questions.service';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable()
export class TrueAnswersResolver implements Resolve<any> {

  constructor(private questionService: QuestionService) {
  }

  public resolve(route: ActivatedRouteSnapshot) {
    return this.questionService.getQuestionInfoFromForm();
  }
}
