import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AddTestService } from '../../../shared/services/add-test.service';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";

@Component({
  selector: 'detail-item-component',
  templateUrl: 'detail-item.component.html',
  styleUrls: ['detail-item.component.scss']
})

export class DetailItemComponent implements OnInit, OnDestroy, AfterViewInit {
  public selfQuestion: any;
  @Input() public question;
  @Input() public id;
  @Input() public i;
  public sub: Subscription;
  public changeFlag: boolean = false;
  public questionFormForm: string;
  public newArrayAnswers: any[] = [];
  public correct: number;

  private editForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
    answers: this.fb.array([
    ]),
    correct: new FormControl('')
  });

  constructor(
    private addTestsService: AddTestService,
    private fb: FormBuilder
  ) {

  }

  get answers(): FormArray {
    return this.editForm.get('answers') as FormArray;
  };

  public addDynamicAnswerInForm() {
    for (let i = 0; i < this.selfQuestion.answers.length; i++) {
      this.answers.push(this.fb.group({
        answer: new FormControl('')
      }));
    }
  }

  public deleteDynamicAnswerInForm() {
    this.answers.removeAt(2);
  }

  public ngOnInit() {

    this.sub = this.addTestsService.getQuestion(this.id, this.question).subscribe((res) => {
      this.selfQuestion = res;
    });

  }

  public ngAfterViewInit() {
    console.log(this.selfQuestion);
    this.addDynamicAnswerInForm()
  }

  public deleteQuestion(keyOfQuestion) {
    this.addTestsService.getQuestion(this.id, keyOfQuestion);
    this.addTestsService.removeQuestion();

  }

  public editItem() {
    console.log('edit')
    this.changeFlag = true;

  }

  public cancelItem() {
    this.changeFlag = false;
  }

  public editQuestionsTest(ev, key: string, value) {
    ev.preventDefault();

    this.questionFormForm = value.question;
    console.log(this.questionFormForm)
    this.newArrayAnswers = [];
    for (let key in value.answers) {
      if (value.answers[key] !== '') {
        this.newArrayAnswers.push(value.answers[key].answer);
      }
    }
    this.addTestsService.getQuestion(this.id, key);
    this.addTestsService.updateQuestion({
      answers: this.newArrayAnswers,
      question: this.questionFormForm,
      // correct: this.correct
    });
    this.changeFlag = false;
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
