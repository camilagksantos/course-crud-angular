import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseFormComponent } from './course-form-component/course-form-component';
import { Courses } from './courses/courses';

const routes: Routes = [
  {
    path: '',
    component: Courses
  },
  {
    path: 'new',
    component: CourseFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
