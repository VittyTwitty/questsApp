import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDialogComponent } from './admin-modal/admin-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTestModalComponent } from '../create-tests/create-test-modal/create-test-modal.component';
import { DialogOverviewExample } from './buttons/add-button.component';
import { DialogEditButtonComponent } from './buttons/edit-button.component';

@NgModule({

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    DialogOverviewExample,
    AdminDialogComponent,
    DialogEditButtonComponent,
  ],
  entryComponents: [
    DialogOverviewExample,
    AdminDialogComponent,
    DialogEditButtonComponent,
    CreateTestModalComponent
  ],
  declarations: [
    AdminDialogComponent,
    DialogOverviewExample,
    DialogEditButtonComponent,
    CreateTestModalComponent
  ],
  providers: [],
})
export class AdminSharedModule {
}
