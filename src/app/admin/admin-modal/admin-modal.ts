import {Component} from '@angular/core';
import {MdDialog} from '@angular/material';


@Component({
  selector: 'dialog-overview-example',
  templateUrl: 'dialog-overview-example.html',
})
export class DialogOverviewExample {
  constructor(public dialog: MdDialog) {}

  openDialog() {
    this.dialog.open(DialogOverviewExampleDialog);
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'admin-modal.html',
})
export class DialogOverviewExampleDialog {}


/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */