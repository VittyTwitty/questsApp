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



   

    deleteTest(event, key) {
        this.keys.forEach(element => {
            if (element == key) {
                // console.log(element);
                this.addTestService.removeTest(element);
            }
        });
    }


    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
