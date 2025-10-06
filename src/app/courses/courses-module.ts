import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesRoutingModule } from './courses-routing-module';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material-module';
import { SharedModuleModule } from '../../shared/shared-module-module';
import { CourseFormComponent } from './components/course-form-component/course-form-component';
import { CoursesListComponent } from './components/courses-list-component/courses-list-component';
import { Courses } from './components/courses/courses';
import { CoursesService } from './services/coursesService';
import { CourseGuardResolver } from './guards/course-guard-resolver';
import { CourseSearchComponent } from './components/course-search-component/course-search-component';
import { CourseOrganizeComponent } from './components/course-organize-component/course-organize-component';


@NgModule({
  declarations: [
    Courses,
    CourseFormComponent,
    CoursesListComponent,
    CourseSearchComponent,
    CourseOrganizeComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AngularMaterialModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    CoursesService,
    { provide: 'courseGuardResolver', useValue: CourseGuardResolver }
  ]
})
export class CoursesModule { }
