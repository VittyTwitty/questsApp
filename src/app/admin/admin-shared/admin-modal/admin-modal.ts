import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddTestService } from '../../../shared/services/add-test.service';
import { AddTest } from '../../../shared/models/add-test';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'admin-modal.html',
  styleUrls: ['admin-modal.scss'],
})

export class AdminDialogComponent implements OnInit {

  public radioValue: number;
  public test: AddTest = new AddTest();

  private form = new FormGroup({
    nameOfTest: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
  });

  constructor(private addTestService: AddTestService) {
  }

  public ngOnInit() {
    this.radioValue = +this.form.value.countOfAnswers;
  }

  public getRadioValue(e) {
    this.radioValue = +e.target.value;
  }

  public addTestsSubmit($event, val) {
    this.addTestService.addNewTest(val.nameOfTest);
  }
}
