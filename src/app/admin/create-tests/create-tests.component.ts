import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AddTestService } from "../../shared/services/add-test.service";
import { AddTest } from "../../shared/models/add-test";
import { Subscription } from "rxjs/Subscription";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: 'q-create-tests',
    templateUrl: 'create-tests.component.html',
    styleUrls: ['create-tests.component.scss']
})

export class CreateTestsComponent implements OnInit, OnDestroy {

    @Input() item;
    sub2: Subscription;
    megaTotal: any[] = [];

    sub: Subscription;
    public tests: AddTest[] = [];
    public keys: any[] = [];

    public newArrayAnswers: any[] = []
    public newArrayQuestions: any[] = [];
    public questionFormForm: string;
    public total: any[] = [];

    public testItem: any;

    constructor(
        private addTestService: AddTestService
    ) {

    }
    private updateForm = new FormGroup({
        question: new FormControl(''),
        answer: new FormControl(''),
        correct: new FormControl('')
    });

    ngOnInit() {
        this.sub = this.addTestService.getTests().subscribe((res) => {
            this.tests = [];
            res.forEach((el) => {
                this.keys.push(el.$key);
                this.testItem = el;
                this.tests.push(this.testItem);
                // console.log(this.tests)
            })
        })

        


    }



    updateQuestionsTest(ev, key: string, value) {
        ev.preventDefault();
        this.addTestService.getTests2(key);
        this.addTestService.addTest({
            answer: '111',
            question: '2000'
        });
       
    }

    deleteTest(event, key) {
        this.keys.forEach(element => {
            if (element == key) {
                // console.log(element);
                this.addTestService.removeTest(element);
            }
        });
    }

    pushToNewQuestions(value) {
        this.questionFormForm = value.question;

        // this.total.push(this.newArrayAnswers);
        // this.total.push(this.questionFormForm);
        // console.log(this.newArrayQuestions)
    }

    pushToAnswers(value) {
        this.newArrayAnswers.push(value.answer);
        // console.log(this.newArrayAnswers)
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.sub2.unsubscribe();
    }


}



// this.addTestService.updateOneTest(key, {
    
//                 answers: this.newArrayAnswers,
//                 // // correct: value.correct,
//                 question: this.questionFormForm,
    
//             }
    
//             );