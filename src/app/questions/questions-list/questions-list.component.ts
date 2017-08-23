import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../shared/questions.service';
import { Questions } from '../../shared/models/questions';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'q-question-list',
  templateUrl: 'questions-list.component.html',
  styleUrls: ['questions-list.component.scss']
})

export class QuestionsListComponent implements OnInit {
  public q: any;
  public items: any;
  public answerThis: any[] = [];
  public quest: Questions[];
  public questionsId: number[] = [];
  public ind: number = 0;

  public radio: any;
  public button: any;
  public coorectAnswersDone: number[] = [];

  public flagTrue: boolean;

  constructor(private questionService: QuestionService,
              private router: Router,
              private sharedService: SharedService) {
    this.getQuestions();
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
  }

  public getQuestions() {
    this.questionService
      .getQuestion()
      .subscribe((res) => {
        this.quest = [];
        res.forEach((q) => {
          this.quest.push(q);
        });
      });
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
}
