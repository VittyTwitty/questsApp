import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RoleGuard } from '../core/role-guard.service';
import { CreateTestsComponent } from './create-tests/create-tests.component';
import { AdminStatisticComponent } from './admin-statistic/admin-statistic.component';
import { DetailTestComponent } from './detail-test/detail-test.component';

export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard],
    children: [
      {
        path: '',
        component: AdminStatisticComponent
      },
      {
        path: 'create-tests',
        component: CreateTestsComponent
      },
      {
        path: 'test/:id',
        component: DetailTestComponent
      }
    ]
  }
];
