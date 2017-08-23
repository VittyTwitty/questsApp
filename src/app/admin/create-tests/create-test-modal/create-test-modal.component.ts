import { Component, OnInit, OnDestroy, Input, Inject } from '@angular/core';
import { AddTestService } from '../../../shared/services/add-test.service';
import { AddTest } from '../../../shared/models/add-test';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'create-test-modal.component',
  templateUrl: 'create-test-modal.component.html',
  styleUrls: ['create-test-modal.component.scss']
})

export class CreateTestModalComponent implements OnInit, OnDestroy {
  @Input() public item;
  public questionFormForm: string;
  public newArrayAnswers: any[] = [];
  public sub: Subscription;
  public tests: AddTest[] = [];
  public keys: any[] = [];
  public testItem: any;

  private updateForm = new FormGroup({
    question: new FormControl(''),
    answers: this.fb.array([
      this.fb.group({
        answer: new FormControl('')
      }),
      this.fb.group({
        answer: ''
      })
    ]),
    correct: new FormControl('')
  });

  constructor(private addTestService: AddTestService,
              private fb: FormBuilder,
              @Inject(MD_DIALOG_DATA) public data: any) {
  }

  public ngOnInit() {
    this.sub = this.addTestService.getTests().subscribe((res) => {
      this.tests = [];
      res.forEach((el) => {
        this.keys.push(el.$key);
        this.testItem = el;
        this.tests.push(this.testItem);
      });
    });
  }

  public setAnswers(a: any[]) {
    const answersFGs = a.map((answers) => this.fb.group(answers));
    const answersFormArray = this.fb.array(answersFGs);
    this.updateForm.setControl('answers', answersFormArray);
  };

  get answers(): FormArray {
    return this.updateForm.get('answers') as FormArray;
  };

  public addDynamicAnswerInForm() {
    this.answers.push(this.fb.group({answer: ''}));
  }

  public deleteDynamicAnswerInForm() {
    this.answers.removeAt(2);
  }

  public updateQuestionsTest(ev, key: string, value) {
    ev.preventDefault();
    this.addTestService.getTests2(key);
    this.addTestService.addTest({
      answer: this.newArrayAnswers,
      question: this.questionFormForm,
    });

  }

  public pushToNewQuestions(value) {
    this.questionFormForm = value.question;
    this.newArrayAnswers = [];
    for (let key in value.answers) {
      // if (value.answers.hasOwnProperty(key)) {
      //   continue;
      // }
      if (value.answers[key] !== '') {
        this.newArrayAnswers.push(value.answers[key]);
        console.log(value.answers[key]);
      }
    }

    // this.total.push(this.newArrayAnswers);
    // this.total.push(this.questionFormForm);
  }

  public pushToAnswers(value) {
    // this.newArrayAnswers.push(value.answer);
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
