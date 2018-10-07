import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
} from '@angular/material';

//import { ProjectRootComponent } from './project-root/project-root.component';
import { ProjectService } from './project.service';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectNewComponent } from './project-new/project-new.component';

@NgModule({
  declarations: [
//  ProjectRootComponent,
    ProjectListComponent,
    ProjectNewComponent
],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    ProjectRoutingModule,
  ],
  exports: [],
  providers: [ProjectService]
})
export class ProjectModule {
}
