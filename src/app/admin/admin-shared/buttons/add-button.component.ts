import { Component } from '@angular/core';
import { AdminDialogComponent } from '../admin-modal/admin-modal';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'dialog-overview-example',
  template: `
    <button md-button (click)="openDialog()">
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44.2 44.2">
        <path
          d="M22.1 44.2C9.9 44.2 0 34.3 0 22.1 0 9.9 9.9 0 22.1 0S44.2 9.9 44.2 22.1 34.3 44.2 22.1 44.2zM22.1 1.5C10.8 1.5 1.5 10.8 1.5 22.1s9.3 20.6 20.6 20.6 20.6-9.2 20.6-20.6S33.5 1.5 22.1 1.5z"/>
        <path
          d="M31.4 22.9H12.8c-0.4 0-0.7-0.3-0.7-0.7s0.3-0.7 0.8-0.7h18.6c0.4 0 0.8 0.3 0.8 0.8S31.8 22.9 31.4 22.9z"/>
        <path
          d="M22.1 32.2c-0.4 0-0.7-0.3-0.7-0.7V12.8c0-0.4 0.3-0.7 0.8-0.7s0.8 0.3 0.8 0.8v18.6C22.9 31.8 22.5 32.2 22.1 32.2z"/>
      </svg>
    </button>`

})
export class DialogOverviewExample {
  constructor(public dialog: MdDialog) {
  }

  public openDialog() {
    this.dialog.open(AdminDialogComponent);
  }
}
