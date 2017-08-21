import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { FormGroup, FormControl } from "@angular/forms";
import { AddTestService } from "../../shared/services/add-test.service";
import { AddTest } from "../../shared/models/add-test";


@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview-example.html',
})
export class DialogOverviewExample {
  constructor(public dialog: MdDialog) { }

  openDialog() {
    this.dialog.open(DialogOverviewExampleDialog);
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'admin-modal.html',
  styleUrls: ['admin-modal.scss'],
})
export class DialogOverviewExampleDialog implements OnInit {
  radioBtnChecked;
  radioBtns: any;
  radioValue: number;
  test: AddTest = new AddTest();

  private form = new FormGroup({
    countOfAnswers: new FormControl('5'),
    nameOfTest: new FormControl('')
  });


  constructor(
    private addTestService: AddTestService
  ) {

  }

  ngOnInit() {
    this.radioValue = +this.form.value.countOfAnswers;
    console.log(this.radioValue);
  }
  getRadioValue(e) {
    this.radioValue = +e.target.value;
    console.log(this.radioValue);
  }

  // addQuestions() {
  //   this.addTestService.addNewTest(this.test);
  // }

  addTestsSubmit($event, val) {
    console.log($event, val);
    this.addTestService.addNewTest(val.nameOfTest);
  }
}
