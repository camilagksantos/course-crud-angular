import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseFormComponent } from './components/course-form-component/course-form-component';
import { Courses } from './components/courses/courses';
import { CourseGuardResolver } from './guards/course-guard-resolver';
import { CourseSearchComponent } from './components/course-search-component/course-search-component';
import { CourseOrganizeComponent } from './components/course-organize-component/course-organize-component';
import { CourseCategoriesComponent } from './components/course-categories-component/course-categories-component';

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
  },
  {
    path: 'search',
    component: CourseSearchComponent
  },
  {
    path: 'statistics',
    component: CourseOrganizeComponent
  },
  {
    path: 'categories',
    component: CourseCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
