import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CoursesRoutingModule } from './courses-routing-module';
import { Courses } from './courses/courses';
import { CourseFormComponent } from './course-form-component/course-form-component';
import { CoursesListComponent } from './courses/component/courses-list-component/courses-list-component';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material-module';
import { SharedModuleModule } from '../../shared/shared-module-module';


@NgModule({
  declarations: [
    Courses,
    CourseFormComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AngularMaterialModule,
    SharedModuleModule,
    ReactiveFormsModule
  ]
})
export class CoursesModule { }
