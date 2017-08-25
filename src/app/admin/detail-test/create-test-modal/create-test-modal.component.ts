import { Component, OnInit, OnDestroy, Input, Inject, Optional } from '@angular/core';
import { AddTestService } from '../../../shared/services/add-test.service';
import { AddTest } from '../../../shared/models/add-test';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'create-test-modal.component',
  templateUrl: 'create-test-modal.component.html',
  styleUrls: ['create-test-modal.component.scss']
})

export class CreateTestModalComponent implements OnInit, OnDestroy {

  @Input() public item;
  public correct: number;
  public questionFormForm: string;
  public newArrayAnswers: any[] = [];
  public sub: Subscription;
  public tests: AddTest[] = [];
  public keys: any[] = [];
  public testItem: any;
  public flagTrue: boolean;

  private updateForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
    answers: this.fb.array([
      this.fb.group({
        answer: new FormControl(''),
        correct_answer: new FormControl('')
      }),
      this.fb.group({
        answer: new FormControl(''),
        correct_answer: new FormControl('')
      })
    ]),
    correct: new FormControl('')
  });

  constructor(private addTestService: AddTestService,
              private fb: FormBuilder,
              @Optional() @Inject(MD_DIALOG_DATA) public data: any) {
    this.flagTrue = true;
  }

  public ngOnInit() {
    this.sub = this.addTestService.getTests().subscribe((res) => {
      this.tests = [];
      res.forEach((el) => {
        this.keys.push(el.$key);
        this.testItem = el;
        // this.tests.push(this.testItem);
      });
      console.log(this.keys);
    });
  }

  // public setAnswers(a: any[]) {
  //   const answersFGs = a.map((answers) => this.fb.group(answers));
  //   const answersFormArray = this.fb.array(answersFGs);
  //   this.updateForm.setControl('answers', answersFormArray);
  // };

  get answers(): FormArray {
    return this.updateForm.get('answers') as FormArray;
  };

  public addDynamicAnswerInForm() {
    this.answers.push(this.fb.group({
      answer: new FormControl(''),
      correct_answer: new FormControl('')
    }));
  }

  public deleteDynamicAnswerInForm() {
    this.answers.removeAt(2);
  }

  public updateQuestionsTest(ev, key: string, value) {
    ev.preventDefault();
    this.questionFormForm = value.question;
    console.log(this.questionFormForm)
    this.newArrayAnswers = [];
    for (let key in value.answers) {
      if (value.answers[key] !== '') {
        this.newArrayAnswers.push(value.answers[key].answer);
      }
    }
    this.addTestService.getTests2(key);
    this.addTestService.addTest({
      answers: this.newArrayAnswers,
      question: this.questionFormForm,
      correct: this.correct
    });
    this.resetForm();
  }

  // public pushToNewQuestions(value) {
  //   this.questionFormForm = value.question;
  //   this.newArrayAnswers = [];
  //   for (let key in value.answers) {
  //     if (value.answers[key] !== '') {
  //       this.newArrayAnswers.push(value.answers[key].answer);
  //       console.log(value.answers[key].answer);
  //     }
  //   }
  // }

  public resetForm() {
    if (this.updateForm.valid) {
      console.log('Form Submitted!');
      this.updateForm.reset();
    }
  }

  // public pushToAnswers() {
  //   if(this.updateForm.valid) {
  //     console.log("Form Submitted!");
  //     this.updateForm.reset();
  //   }
  // }
  public checkCheckbox(ev, i: number) {
    if (ev.target.checked) {
      console.log(i);
      this.correct = i;
    }
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
