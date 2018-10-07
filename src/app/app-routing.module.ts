import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

const appRoutes: Routes = [
  // {
  //   path: 'employees',
  //   loadChildren: './employee/employee.module#EmployeeModule',
  // },
  {
    path: 'projects',
    loadChildren: './project/project.module#ProjectModule',
  },
  // {
  //   path: 'timesheets',
  //   loadChildren: './timesheet/timesheet.module.ts#TimesheetModule'
  // },
  {
    path: '',
    redirectTo: '/project',
    pathMatch: 'full',
  },
  //{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports:[
    RouterModule
  ]
})

export class AppRoutingModule { }
