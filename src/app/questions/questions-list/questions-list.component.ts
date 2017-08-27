import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionService } from '../../shared/questions.service';
import { Questions } from '../../shared/models/questions';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared.service';
import { ActivatedRoute } from "@angular/router";
import { AddTestService } from "../../shared/services/add-test.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'q-question-list',
  templateUrl: 'questions-list.component.html',
  styleUrls: ['questions-list.component.scss']
})

export class QuestionsListComponent implements OnInit, OnDestroy {

  sub: Subscription;
  public id: string;
  public q: any;
  public items: any;
  public answerThis: any[] = [];
  public quest: any;
  public questionsId: number[] = [];
  public ind: number = 0;

  public radio: any;
  public button: any;
  public coorectAnswersDone: number[] = [];

  public flagTrue: boolean;

  constructor(
    private addTestService: AddTestService,
    private questionService: QuestionService,
    private router: Router,
    private sharedService: SharedService,
    public route: ActivatedRoute
  ) {
    this.radio = document.getElementsByName('radio');
    this.button = document.getElementsByClassName('s-question_submit');
    this.flagTrue = true;
  }

  public ngOnInit() {
    this.sharedService.trueAnswers = this.coorectAnswersDone;

    this.questionService.getQuestionInfoFromForm().subscribe((res) => {
      this.answerThis = res;
    });

    this.items = this.questionService.getSnapshotQuestionInfoFromForm();
    this.items
      .subscribe((snapshots) => {
        snapshots.forEach((snapshot) => {
          this.q = snapshot;
        });
      });

    this.getQuestions();
  }

  public getQuestions() {
    this.id = this.route.snapshot.params['id'];
    this.sub = this.addTestService.getOneTest(this.id)
      .subscribe((data) => {
        this.quest = [];
        for (let key in data) {
          if (key !== 'name_test') {
            this.quest.push(data[key]);
          }
        }

        console.log(this.quest);
      });
    // this.addTestService
    //   .getTests2(this.id)
    //   .subscribe((res) => {
    //     this.quest = [];

    //     console.log(res)
    //   });
  }

  public toggleTrueFlag() {
    this.flagTrue = false;
  }

  public maxId(): number {
    let max: number;
    for (let i = 0; i <= this.quest.length; i++) {
      max = i;
    }
    return max - 1;
  }

  public addUncheckedRadio(radio) {
    radio.forEach((element) => {
      element.checked = false;
    });
  }

  public correctAnswerOrNo() {
    let radioId;
    this.radio.forEach((element, i) => {
      radioId = +element.id.slice(6);
      if (element.checked) {
        if (radioId === this.quest[this.ind].correct) {
          this.coorectAnswersDone.push(this.quest[this.ind].correct);
        } else {
          this.coorectAnswersDone.push(0);
        }
      }
    });
  }

  public nextAnswer() {
    if (this.ind < this.maxId()) {
      this.correctAnswerOrNo();
      this.ind++;
      this.flagTrue = true;
      this.addUncheckedRadio(this.radio);
    } else {
      this.correctAnswerOrNo();
      this.ind++;
      for (let i = 0; i < this.coorectAnswersDone.length; i++) {
        if (this.coorectAnswersDone[i] === 1) {
          let qwer;
          let nocorrect;
          qwer = this.answerThis[i].correctly;
          nocorrect = this.answerThis[i].nocorrectly;
          qwer++;

          this.questionService.addQuestionInfoFromForm(i, qwer, nocorrect);
        } else {
          let qwer;
          let correct;
          correct = this.answerThis[i].correctly;
          qwer = this.answerThis[i].nocorrectly;
          qwer++;
          this.questionService.addQuestionInfoFromForm(i, correct, qwer);
        }
      }
      this.router.navigate(['/result']);
    }
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
