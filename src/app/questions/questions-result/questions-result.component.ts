import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { UserService } from '../../core/user.service';
import { AuthService } from '../../core/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { CountService } from '../../shared/services/count.service';

@Component({
  selector: 'q-question-result',
  templateUrl: 'questions-result.component.html',
  styleUrls: ['questions-result.component.scss']
})

export class QuestionsResultComponent implements OnInit, OnDestroy {
  public counterTests: number;
  public currentUserAnswers: any;
  public sub2: Subscription;
  public sub: Subscription;
  public uid: any;
  public answers: number[];
  public trueAnswer;
  public falseAnswer;
  public user;

  constructor(private data: SharedService,
              private userService: UserService,
              private authService: AuthService,
              public afd: AngularFireDatabase,
              private countService: CountService) {
    this.trueAnswer = 0;
    this.falseAnswer = 0;

    this.sub = this.authService.authListener()
      .subscribe((d) => {
          this.user = this.userService.getUser();
          this.uid = this.user.uid;
        });
    this.sub2 = this.userService.getUserMap()
      .subscribe((res) => {
        res.forEach((element) => {
          if (element.$key === this.user.uid) {
            this.currentUserAnswers = element.tests;
            this.setUser(this.trueAnswer, this.falseAnswer);
          }
        });
      });
  }

  public ngOnInit() {

    this.answers = this.data.trueAnswers;
    this.counterTests = this.data.counter;
    this.finallyResult();
  }

  public finallyResult() {
    for (let i of this.answers) {
      if (this.answers[i] !== 0) {
        this.trueAnswer++;
      } else {
        this.falseAnswer++;
      }
    }
  }

  public setUser(trueA, falseA) {
    if (this.currentUserAnswers.bestCorrectlyAnswer > trueA) {
      trueA = this.currentUserAnswers.bestCorrectlyAnswer;
    } else {
      trueA = trueA;
    }
    if (this.currentUserAnswers.bestNocorrectlyAnswer > falseA) {
      falseA = this.currentUserAnswers.bestNocorrectlyAnswer;
    } else {
      falseA = falseA;
    }

    this.userService.addUserBestAns(this.uid).update({
      countOfTests: this.countService.count,
      bestCorrectlyAnswer: trueA,
      bestNocorrectlyAnswer: falseA
    });
  }

  public countAnswers() {
    this.countService.count = this.currentUserAnswers.countOfTests;
    this.countService.count++;
  }

  public smallerBigest(pervios, next) {
    if (pervios < next) {
      return next;
    } else {
      return pervios;
    }
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
