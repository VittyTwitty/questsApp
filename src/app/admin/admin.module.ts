import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './admin.routing';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { AdminStatisticComponent } from './admin-statistic/admin-statistic.component';
import { CreateTestsComponent } from './create-tests/create-tests.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdDialogModule,

} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminSharedModule } from './admin-shared/admin-shared.module';
import { DetailTestComponent } from './detail-test/detail-test.component';
import { DetailItemComponent } from './detail-test/detail-item/detail-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    SharedModule,
    ChartsModule,
    BrowserAnimationsModule,
    MdDialogModule,
    ReactiveFormsModule,
    AdminSharedModule
  ],
  exports: [
    CreateTestsComponent,
    MdDialogModule
  ],
  declarations: [
    AdminComponent,
    AdminStatisticComponent,
    CreateTestsComponent,
    DetailTestComponent,
    DetailItemComponent
  ],
  providers: [],
})
export class AdminModule {
}
