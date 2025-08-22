import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseFormComponent } from './components/course-form-component/course-form-component';
import { Courses } from './components/courses/courses';
import { CourseGuardResolver } from './guards/course-guard-resolver';

const routes: Routes = [
  {
    path: '',
    component: Courses
  },
  {
    path: 'new',
    component: CourseFormComponent,
    resolve: { course: CourseGuardResolver }
  },
  {
    path: 'edit/:id',
    component: CourseFormComponent,
    resolve: { course: CourseGuardResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
