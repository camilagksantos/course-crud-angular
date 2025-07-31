import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing-module';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material-module';
import { Courses } from './courses/courses';
import { SharedModuleModule } from '../../shared/shared-module-module';


@NgModule({
  declarations: [
    Courses
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AngularMaterialModule,
    SharedModuleModule
  ]
})
export class CoursesModule { }
