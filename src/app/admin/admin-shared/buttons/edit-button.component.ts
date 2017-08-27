import { Component, Input } from '@angular/core';
import { MdDialog } from '@angular/material';
import { CreateTestModalComponent } from '../../detail-test/create-test-modal/create-test-modal.component';

@Component({
  selector: 'button-edit-modal',
  template: `
    <button class="button_edit-test" (click)="openDialog()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><polygon points="42 20 22 20 22 0 20 0 20 20 0 20 0 22 20 22 20 42 22 42 22 22 42 22 "/></svg>
    </button>`,
  styles: [`
    .button_edit-test {
      background: #5BB85D;
      border: none;
      cursor: pointer;
      transition: .3s;
      width: 100%;
      height: 70px;
    }
    .button_edit-test:hover { 
      background-color: #4EA050;
    }
    svg {
      width: 45px;
      height: 45px;
      fill: #fff; 
    }
    `]
})
export class DialogEditButtonComponent {
  @Input() public item;

  constructor(public dialog: MdDialog) {
  }

  public openDialog() {
    let dialogRef = this.dialog.open(CreateTestModalComponent, {
      data: this.item,
    });
  }
}
