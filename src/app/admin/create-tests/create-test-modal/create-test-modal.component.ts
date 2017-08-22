import { Component, OnInit, OnDestroy, Input, Inject } from '@angular/core';
import { AddTestService } from "../../../shared/services/add-test.service";
import { AddTest } from "../../../shared/models/add-test";
import { Subscription } from "rxjs/Subscription";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'create-test-modal.component',
    templateUrl: 'create-test-modal.component.html',
    styleUrls: ['create-test-modal.component.scss']
})

export class CreateTestModalComponent implements OnInit, OnDestroy {
    @Input() item;

    public questionFormForm: string;
    public newArrayAnswers: any[] = [];
    public sub: Subscription;
    public tests: AddTest[] = [];
    public keys: any[] = [];
    public testItem: any;

    constructor(
        private addTestService: AddTestService,
        @Inject(MD_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        this.sub = this.addTestService.getTests().subscribe((res) => {
            this.tests = [];
            res.forEach((el) => {
                this.keys.push(el.$key);
                this.testItem = el;
                this.tests.push(this.testItem);
                // console.log(this.tests)
            })
        });
    }
    private updateForm = new FormGroup({
        question: new FormControl(''),
        answer: new FormGroup({
            answer_1: new FormControl(''),
            answer_2: new FormControl(''),
        }),
        correct: new FormControl('')
    });

    updateQuestionsTest(ev, key: string, value) {
        ev.preventDefault();
        this.addTestService.getTests2(key);
        this.addTestService.addTest({
            answer: this.newArrayAnswers,
            question: this.questionFormForm,
        });

    }


    pushToNewQuestions(value) {
        this.questionFormForm = value.question;
        console.log(this.data);


        this.newArrayAnswers = [];
        for (let key in value.answer) {
            console.log(value.answer[key]);
            if (value.answer[key] != '') {
                this.newArrayAnswers.push(value.answer[key])
            }
        }
        // this.total.push(this.newArrayAnswers);
        // this.total.push(this.questionFormForm);
        // console.log(this.newArrayQuestions)
    }

    pushToAnswers(value) {
        console.log(value);

        // this.newArrayAnswers.push(value.answer);
        // console.log(value.answer.getValue())
        // console.log(this.newArrayAnswers)
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}