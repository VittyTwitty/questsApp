import { Component, OnInit, Input } from '@angular/core';
import { MdDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AddTestService } from "../../../shared/services/add-test.service";
import { AddTest } from "../../../shared/models/add-test";

import { CreateTestModalComponent } from "../../create-tests/create-test-modal/create-test-modal.component";


@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'button-main-modal.html',

})
export class DialogOverviewExample {
  constructor(public dialog: MdDialog) { }

  openDialog() {
    this.dialog.open(DialogOverviewExampleDialog);
  }
}

@Component({
  selector: 'button-edit-modal',
  templateUrl: 'button-edit-modal.html',
})
export class DialogEditButton {
  @Input() item;
  constructor(public dialog: MdDialog) {
  }

  openDialog() {
    console.log(this.item);
    let dialogRef = this.dialog.open(CreateTestModalComponent, {
      data: this.item,
    });
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
    nameOfTest: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
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


  addTestsSubmit($event, val) {
    console.log($event, val);
    this.addTestService.addNewTest(val.nameOfTest);
  }
}

@Component({
  selector: 'admin-edit-modal-bodys',
  templateUrl: 'admin-edit-modal-body.html',
})
export class AdminEditModalBody implements OnInit {
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


  addTestsSubmit($event, val) {
    console.log($event, val);
    this.addTestService.addNewTest(val.nameOfTest);
  }
}
