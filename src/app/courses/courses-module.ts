import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CoursesRoutingModule } from './courses-routing-module';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material-module';
import { SharedModuleModule } from '../../shared/shared-module-module';
import { CourseFormComponent } from './components/course-form-component/course-form-component';
import { CoursesListComponent } from './components/courses-list-component/courses-list-component';
import { Courses } from './components/courses/courses';


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
