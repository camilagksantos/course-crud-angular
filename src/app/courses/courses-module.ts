import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing-module';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material-module';
import { Courses } from './courses/courses';
import { SharedModuleModule } from '../../shared/shared-module-module';
import { CourseFormComponent } from './course-form-component/course-form-component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Courses,
    CourseFormComponent
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
