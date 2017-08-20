import { Component, OnInit } from '@angular/core';
import { AddTestService } from "../../shared/services/add-test.service";
import { AddTest } from "../../shared/models/add-test";

@Component({
    selector: 'q-create-tests',
    templateUrl: 'create-tests.component.html',
    styleUrls: ['create-tests.component.scss']
})

export class CreateTestsComponent implements OnInit {
    test: AddTest = new AddTest();
    tests: AddTest[];
    public key: string;
    constructor(
        private addTestService: AddTestService
    ) {

    }

    ngOnInit() {
        this.addTestService.getTests().subscribe((res) => {
            this.tests = res;
            this.tests.forEach((el) => {
                this.key = el.$key;
                console.log(this.key)
            })
        })
    }

    addQuestions() {
        this.addTestService.addNewTest(this.test);
    }
}